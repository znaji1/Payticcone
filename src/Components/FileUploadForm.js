import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

const FileUploadForm = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://127.0.0.1:8000/uploadedfiles/", formData)
      .then((response) => {
        console.log("File uploaded successfully:", response.data);
        setData(response.data); // Store received data in the state
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  useEffect(() => {
    // Fetch the data from the API when the component mounts
    axios
      .get("http://your-api-url/uploadedfiles/")
      .then((response) => {
        console.log("Data fetched successfully:", response.data);
        setData(response.data); // Store fetched data in the state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Transaction Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell> Merchant Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.transactionID}</TableCell>
                <TableCell>{item.transactionDate}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.merchantName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FileUploadForm;
