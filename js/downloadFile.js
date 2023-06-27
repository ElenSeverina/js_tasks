const downloadFile = (type, content, name) => {
  const prefix = type === 'csv'
    ? 'data:text/csv;charset=utf-8,'
    : 'data:text/csv;charset=utf-8,';

  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(`${prefix}${content}`));
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

downloadFile('csv', newScrapper.createCSV(), 'all-in-one.csv');
