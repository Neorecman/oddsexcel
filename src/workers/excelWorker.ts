// Excel Worker for processing large files
self.onmessage = async (e) => {
  try {
    const { data, chunkSize } = e.data;
    const XLSX = await import('xlsx');
    
    const workbook = XLSX.read(data, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON in chunks
    const allData = XLSX.utils.sheet_to_json(worksheet);
    const totalChunks = Math.ceil(allData.length / chunkSize);
    
    // Send total count first
    self.postMessage({ type: 'total', count: allData.length });
    
    // Process and send data in chunks
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = start + chunkSize;
      const chunk = allData.slice(start, end);
      
      self.postMessage({
        type: 'chunk',
        data: chunk,
        chunkIndex: i,
        totalChunks
      });
      
      // Small delay to prevent UI blocking
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    self.postMessage({ type: 'complete' });
  } catch (error) {
    self.postMessage({ type: 'error', error: error.message });
  }
};