const checkExcelFile = (filename) => {
  const excelFileRegex = /\.(csv|xlsx|xls)$/i;

  return excelFileRegex.test(filename);
};

export default checkExcelFile
