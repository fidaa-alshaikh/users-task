import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar(props) {
    const {searchField, setSearchField} = props;
    
  const handleChange = (event) => {
    setSearchField(event.target.value);
  };


  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="Search by name, email" variant="standard"
        value={searchField}
        onChange={handleChange} />
      </Box>
    </Box>
  );
}