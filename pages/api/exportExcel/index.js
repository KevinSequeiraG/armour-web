var XLSX = require("xlsx");

export default function handler(req, res) {
  // Método para convertir array de datos a Excel
  const exportToExcel = (data, sheetName, res) => {
    // Crear una hoja de cálculo con los datos
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Generar buffer de Excel
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Establecer encabezados de la respuesta
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${sheetName}.xlsx`);

    // Enviar el archivo al cliente
    res.end(Buffer.from(excelBuffer));
  };

  // Verificar el método HTTP
  if (req.method === 'POST') {
    // Aquí recibirías tus datos del cuerpo de la solicitud
    const data = req.body; // Asegúrate de que esto sea un array de objetos
    const fileName = req.body.fileName || 'document';
    // Llamar al método para exportar los datos
    exportToExcel(data, 'Datos', res);
  } else {
    // Manejar cualquier método HTTP que no sea POST
    res.status(405).end(); // Método no permitido
  }
}