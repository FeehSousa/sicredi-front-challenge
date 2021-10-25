import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  useGridApiRef,
  DataGridPro,
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import {
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    actions: {
      color: theme.palette.text.secondary,
    },
    textPrimary: { 
      color: theme.palette.text.primary,
    },
  }),
  { defaultTheme },
);

const rows = [
  { id: 1, NDC: '0023', ABG: 'Agência', CTL: '100',COO :'0809', AC :'02', DIDF: randomUpdatedDate() },
  { id: 2, NDC: '0023', ABG: 'Cooperativa', CTL: '100', COO :'0809', AC :'02', DIDF: randomUpdatedDate() },
  { id: 3, NDC: '0023', ABG: 'Cooperativa', CTL: '100', COO :'0809', AC :'02', DIDF: randomUpdatedDate() },
  { id: 4, NDC: '0023', ABG: 'Cooperativa', CTL: '100', COO :'0809', AC :'02', DIDF: randomUpdatedDate() },
  { id: 5, NDC: '0023', ABG: 'Agência', CTL: '100', COO :'0809', AC :'02', DIDF: randomUpdatedDate() },
  { id: 6, NDC: '0023', ABG: "Agência", CTL: '100', COO :'0809', AC :'02', DIDF: randomUpdatedDate() },
  { id: 7, NDC: '0023', ABG: 'Cooperativa', CTL: '100', COO :'0809', AC :'02', DIDF: randomUpdatedDate() },
  { id: 8, NDC: '0023', ABG: 'Agência', CTL: '100',COO :'0809', AC :'02', DIDF: randomUpdatedDate() },
  { id: 9, NDC: '0023', ABG: 'Agência', CTL: '100', COO :'0809', AC :'02', DIDF: randomUpdatedDate() },
  { id: 10, NDC: '0023', ABG: 'Agência', CTL: '100', COO :'0809', AC :'02', DIDF: randomUpdatedDate() },
  { id: 11, NDC: '0023', ABG: 'Agência', CTL: '100', COO :'0809', AC :'02', DIDF: randomUpdatedDate() },
  { id: 12, NDC: '0023', ABG: 'Agência', CTL: '100', COO :'0809', AC :'02', DIDF: randomUpdatedDate() },
  { id: 13, NDC: '0023', ABG: 'Agência', CTL: '100', COO :'0809', AC :'02', DIDF: randomUpdatedDate() },
];


export default function FullFeaturedCrudGrid() {
  const classes = useStyles();
  const apiRef = useGridApiRef();

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleCellFocusOut = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => (event) => {
    event.stopPropagation();
    apiRef.current.setRowMode(id, 'edit');
  };

  const handleSaveClick = (id) => (event) => {
    event.stopPropagation();
    apiRef.current.commitRowChange(id);
    apiRef.current.setRowMode(id, 'view');

    const row = apiRef.current.getRow(id);
    apiRef.current.updateRows([{ ...row, isNew: false }]);
  };

  const handleDeleteClick = (id) => (event) => {
    event.stopPropagation();
    apiRef.current.updateRows([{ id, _action: 'delete' }]);
  };

  const handleCancelClick = (id) => (event) => {
    event.stopPropagation();
    apiRef.current.setRowMode(id, 'view');

    const row = apiRef.current.getRow(id);
    if (row.isNew) {
      apiRef.current.updateRows([{ id, _action: 'delete' }]);
    }
  };

  const columns = [
    { field: 'NDC', headerName: 'Número do Comitê', width: 200, },
    { field: 'ABG', headerName: 'Abrangência', width: 200 },
    { field: 'CTL', headerName: 'Central', width: 200 },
    { field: 'COO', headerName: 'Cooperativa', width: 200 },
    { field: 'AC', headerName: 'Agência', width: 200 },
    { field: 'DIDF', headerName: 'Data Início Data Fim', width: 200, type: 'date'},
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Situação',
      width: 100,
      cellClassName: classes.actions,
      getActions: ({ id }) => {
        const isInEditMode = apiRef.current.getRowMode(id) === 'edit';

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              color="primary"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className={classes.textPrimary}
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className={classes.textPrimary}
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div style={{ height: 500, width: '55%' }}>
      <DataGridPro
        rows={rows}
        columns={columns}
        apiRef={apiRef}
        editMode="row"
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        onCellFocusOut={handleCellFocusOut}
        componentsProps={{
          toolbar: { apiRef },
        }}
      />
    </div>
  );
}
