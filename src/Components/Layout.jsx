import { Outlet } from "react-router-dom";
import { useState } from 'react';
import AppBar from "./AppBar";
import SearchResult from "./SearchResult";
import food from '../ITALIA-fruits-and-veggies.csv'


/* MUI IMPORTS */
import ListItem from '@mui/material/ListItem'
import Drawer from '@mui/material/Drawer'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import { Typography } from "@mui/material"
import { Box } from "@mui/material"


const theme = createTheme({
  palette: {
    primary: {
      main: '#13bf8d', //green
      white: '#f4fbeb',
      blue: '#4071d8',
      gray: '555766',

    },
    secondary: {
      main: '#ff7664', //red

    }
  },
  breakpoints: {
    values: {
      xs: 450,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

})

function Layout() {
  const [ifSearched, setIfSearched] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const closeModal = () => setIfSearched(false)
  const openModal = () => setIfSearched(true)

  const onSearch = (query, food) => {
    if (query != '') {
      setIfSearched(true)
      setSearchResults(food)
    }
  }

  const MainBox = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '450px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    paddingBottom: '1em',
    minHeight: '100%',
    boxShadow: '3px 4px 8px #888888'
  }));

  
   //side drawer code
   const [state, setState] = useState(false);
  
   const toggleDrawer = (event) => {
     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
       return;
     }
     setState(!state);
   };
   const list = (
     <Box
       sx={{ width: 250, textTransform:'uppercase', color: '#3e3e3e', fontWeight: 'bold' }}
       role="presentation"
       onClick={toggleDrawer}
       onKeyDown={toggleDrawer}
     >
       <nav>
         <ListItem disablePadding>
           <ListItemButton>
             <ListItemText primary="about the app" />
           </ListItemButton>
         </ListItem>
         <ListItem disablePadding>
           <ListItemButton>
           <Typography variant="button" display="block" gutterBottom>
            contribute
           </Typography>
           </ListItemButton>
         </ListItem>
         <ListItem disablePadding>
           <ListItemButton>
             <ListItemText primary="contact" />
           </ListItemButton>
         </ListItem>
       </nav>
     </Box>
   )

  return (
    <ThemeProvider theme={theme}>
      <MainBox bgcolor="primary.white" className="main-container">
        <Drawer
          open={state}
          onClose={toggleDrawer}
        >
          {list}
        </Drawer>
        <div className="main-layout">
          <AppBar
            onSearch={onSearch}
            toggleDrawer={toggleDrawer}
            food={food}
            ifSearched={ifSearched}
          />
          {ifSearched ?
            <SearchResult
              searchResults={searchResults}
              ifSearched={ifSearched}
              closeModal={closeModal}
              openModal={openModal}
            />
            : null}
          <Outlet />
        </div>
      </MainBox>
    </ThemeProvider>

  )
};

export default Layout





