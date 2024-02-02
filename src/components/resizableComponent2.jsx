import React, { useEffect, useState, forwardRef, useImperativeHandle   } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import axios from "axios";
import {
  TablePagination,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const ResizableDiv = forwardRef(({updateTodo, getAllData}, ref) => {
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [data, setData] = useState({ data: [], metaData: [] });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getSize();
    window.addEventListener("resize", getSize);
    getData();
  }, []);

  useEffect(()=>{
    getData()
  }, [page, rowsPerPage])

  const getSize = () => {
    let obj = {
      height: window.innerHeight / 2 - 10,
      width: (window.innerWidth / 4) * 3 - 10,
    };

    setSize(obj);
  };

  const getData = async () => {
    try {
      let url = process.env.REACT_APP_BASE_URL + `/todo/getTodo?page=${page}&limit=${rowsPerPage}`;
      let data = await axios.get(url);

      setData(data.data.data);
    } catch (er) {
      console.log(er);
    }
  };

  const handleDelete = async(data)=>{
    try {
      let url = process.env.REACT_APP_BASE_URL + `/todo/deleteTodo?_id=${data._id}`;

      await axios.delete(url);

      getAllData()
    } catch (er) {
      console.log(er);
    }
  }

  useImperativeHandle(ref, () => ({
    getData,
  }), []);

  const ShowData = () => {
    return (
      <div>
        <div>
          <List
            sx={{
              width: 350,
              maxWidth: size.width,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: size.height * 0.6,
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
          >
            {data.data.map((d, i) => (
              <li key={i}>
                <ul>
                  <ListItem key={i}>
                    <ListItemText primary={d.text} />
                    <ListItemIcon>
                    <Button
                  variant="contained"
                  color="primary"
                  onClick={()=>updateTodo(d)}
                  style={{fontSize:10}}
                >
                  Update
                </Button>
                      <DeleteIcon onClick={()=>handleDelete(d)} />
                    </ListItemIcon>
                  </ListItem>
                </ul>
              </li>
            ))}
          </List>
        </div>

        <div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={data.metadata[0].total}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    );
  };

  return (
    <ResizableBox
      width={size.width}
      height={size.height}
      resizeHandles={["ne", "nw", "se", "sw", "n", "e", "s", "w"]}
      minConstraints={[100, 50]}
    >
      <div
        style={{
          position: "relative",
          border: "1px solid #ddd",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h4>Todos</h4>
        {data.data.length ? ShowData() : <p>No Tasks added</p>}
      </div>
    </ResizableBox>
  );
});

export default ResizableDiv;
