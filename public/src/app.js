$(document).ready(() => {
  function highlight(input, highlightString) {
    return input && input.includes(highlightString)
      ? input.replace(highlightString, `<span class="highlighted-text">${highlightString}</span>`)
      : input || '';
  }

  function generateData() {
    return window.tagList.map(tag => ({
      id: tag.id,
      text: tag.title,
      tag,
    }));
  }

  function formatResult(result) {
    if (!result.tag) {
      return null;
    }
    const { tag, term } = result;
    const alternativeNames = tag.alternativeNames
      && tag.alternativeNames.map(name => `
        <span class="selector__result__alternativeNameLabel">
          ${highlight(name, term)}
        </span>`).join('');
    return $(`
      <div class="selector__result">
        <div class="selector__result__title">${highlight(tag.title, term)}</div>
        <div class="selector__result__description">${tag.description}</div>
        ${alternativeNames}
      </div>
    `);
  }

  function searchTags(params, data) {
    const { tag } = data;
    const term = params.term && $.trim(params.term.toLowerCase());
    const modifiedData = { ...data, term };

    if (!term) {
      return modifiedData;
    }

    const isMatch = tag && (
      tag.title.toLowerCase().includes(term)
      || tag.alternativeNames.some(name => name.toLowerCase().includes(term))
    );

    return isMatch ? modifiedData : null;
  }

  function start() {
    const data = generateData();
    const listSelector = $('<select class="selector" multiple="multiple" ></select>');
    const app = $('<div class="container"></div>').append(listSelector);

    $('#app').append(app);

    $(listSelector).select2({
      data,
      allowClear: true,
      placeholder: 'Please select a tag',
      templateResult: formatResult,
      matcher: searchTags,
    });
  }

  start();
});
