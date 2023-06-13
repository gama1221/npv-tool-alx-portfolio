import {useState} from 'react';
import MaterialReactTable from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv'; //or use your library of choice here
import PictureAsPdfOutlined from '@mui/icons-material/PictureAsPdfOutlined';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

const columns = [
  {
    accessorKey: 'month', //access nested data with dot notation
    header: 'Month',
  },
  {
    accessorKey: 'principal', //access nested data with dot notation
    header: 'Principal',
  },
  {
    accessorKey: 'interest',
    header: 'Interest',
  },
  {
    accessorKey: 'scheduledPayment', //normal accessorKey
    header: 'Scheduled Payment',
  }, {
    accessorKey: 'endingBalance', //normal accessorKey
    header: 'Ending Balance',
  }, {
    accessorKey: 'cumulativeInterest', //normal accessorKey
    header: 'Interest Sum',
  },
]

const csvOptions = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
  headers: columns.map((c) => c.header),
};

const csvExporter = new ExportToCsv(csvOptions);

const PrincipalWaiverAndExtensionComponent = ({ data }) => {
  const [theme, setTheme] = useState('');

  const handleChange = (event) => {
    setTheme(event.target.value);
    // alert(event.target.value)
  };


  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(data);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setTextColor(128, 0, 128);
    doc.text("NPV With Principal Waiver plus Extension Amortization Table", 20, 10)
    // convert array of objects to array of arrays because of the autoTable body supports array of arrays
    const arrify = (data = []) => {
      const res = [];
      const { length: l } = data;
      for (let i = 0; i < l; i++) {
        const obj = data[i];
        const subArr = Object.values(obj);
        res.push(subArr);
      };
      return res;
    };
    autoTable(doc, {
      theme:  theme ,
      columns: columns.map(col => ({ ...col, datakey: col.accessorKey })),
      // body: data.map((row) => row.interest)
      body: arrify(data)
    },
    {
      columns: columns.map(col => ({ ...col, datakey: col.accessorKey })),
      // body: data.map((row) => row.interest)
      body: arrify(data)
    }
    )
    let date = new Date();
    // date = inputDate.getDate();
    doc.save(`principal-waiver-plus-extension-amortization-table ${date}.pdf`)
  };
  
  return (
    <MaterialReactTable
      className="table table-striped"
      columns={columns}
      data={data}
      enableRowSelection
      positionToolbarAlertBanner="bottom"
      renderTopToolbarCustomActions={({ table }) => (
        <Box
          sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
        >
          <Button
            color="secondary"
            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
            onClick={handleExportData}
            startIcon={<FileDownloadIcon />}
            variant="outlined" // contained"
            data-toggle="tooltip"
            title="Export the whole data in Excel format"
          >
            Export2Excel
          </Button>
          <Button
            color='secondary'
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            //only export selected rows
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            startIcon={<FileDownloadIcon />}
            variant="outlined"
            data-toggle="tooltip"
            title="Export the selected data in Excel format"
          >
            Export Selected Rows
          </Button>

          <Button
            color='secondary'
            disabled={table.getRowModel().rows.length === 0}
            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
            // onClick={() => handleExportRows(table.getRowModel().rows)}
            onClick={() => exportToPDF()}
            startIcon={<PictureAsPdfOutlined />}
            data-toggle="tooltip" title='Export to PDF'
            variant="outlined"
          >
            Export2PDF
          </Button>
          <FormControl variant="standard" color='secondary' sx={{ minWidth: 140 }}>
            <InputLabel id="theme-type">--Select Theme--</InputLabel>
            <Select
              labelId="theme-type"
              id="theme-type-select-standard"
              value={theme}
              onChange={handleChange}
              label="Theme"
            >
              <MenuItem value="">
                <em>Theme</em>
              </MenuItem>
              <MenuItem value="grid">Grid</MenuItem>
              <MenuItem value="plain">Plain</MenuItem>
              <MenuItem value="striped">Striped</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
    />
  );
};

export default PrincipalWaiverAndExtensionComponent;