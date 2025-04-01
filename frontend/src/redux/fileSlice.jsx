import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4000";

export const uploadFile = createAsyncThunk("files/uploadFiles", async (fileData, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("file", fileData);

    const response = await axios.post(`${API_URL}/api/files/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    return response.data.file; 
  } catch (error) {
    console.error("Upload Error:", error);
    return rejectWithValue(error.response?.data?.message || "File upload failed");
  }
});

export const fetchUserFiles = createAsyncThunk("files/fetchUserFiles", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/api/files/getFiles`, {
      withCredentials: true,
    });
    return response.data.files; 
  } catch (error) {
    console.error("Fetch Error:", error);
    return rejectWithValue(error.response?.data?.message || "Failed to fetch files");
  }
});

export const downloadFile = createAsyncThunk("files/downloadFile", async (filename, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/api/files/download/${filename}`, {
      responseType: "blob",
      withCredentials: true,
    });

    // Create a download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();

    return filename;
  } catch (error) {
    console.error("Download Error:", error);
    return rejectWithValue(error.response?.data?.message || "Download failed");
  }
});


  
const initialState = {
  files: [], 
  loading: false,
  error: null,
};

const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
   
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.files = state.files ? [...state.files, action.payload] : [action.payload];
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload; 
      })
      .addCase(fetchUserFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
   
      .addCase(downloadFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(downloadFile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default fileSlice.reducer;
