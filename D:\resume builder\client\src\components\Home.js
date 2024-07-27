import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  Paper,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import WorkIcon from '@mui/icons-material/Work';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Skills from './Skills';
import { styled } from '@mui/system';
import Loading from './Loading'; // Make sure this file exists and is correctly named

// Custom styles
const AppBarStyled = styled(AppBar)({
  backgroundColor: '#3f51b5', // AppBar background color
});

const ToolbarStyled = styled(Toolbar)({
  backgroundColor: '#303f9f', // Toolbar background color
  padding: '0 16px',
});

const DrawerStyled = styled(Drawer)({
  width: 240,
  flexShrink: 0,
});

const DrawerPaperStyled = styled('div')({
  width: 240,
  backgroundColor: '#f4f4f4',
});

const PaperStyled = styled(Paper)({
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff', // Paper background color
});

const backgroundStyle = {
  backgroundImage: 'url(https://source.unsplash.com/random)', // Replace with your image URL
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  padding: '20px',
};

const ToolbarTitle = styled(Typography)({
  color: 'white', // Heading text color
  fontWeight: 'bold',
  flexGrow: 1,
});

function Home({ setResult }) {
  const [fullName, setFullName] = useState('');
  const [currentPosition, setCurrentPosition] = useState('');
  const [currentLength, setCurrentLength] = useState(1);
  const [currentTechnologies, setCurrentTechnologies] = useState('');
  const [headShot, setHeadShot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddSkill = () => {
    if (selectedSkill && !skills.includes(selectedSkill)) {
      setSkills([...skills, selectedSkill]);
      setSelectedSkill('');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('headshotImage', headShot, headShot.name);
    formData.append('fullName', fullName);
    formData.append('currentPosition', currentPosition);
    formData.append('currentLength', currentLength);
    formData.append('currentTechnologies', currentTechnologies);

    try {
      const response = await axios.post('http://localhost:4000/resume/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message) {
        console.log(response.data.data);
        setResult(response.data.data);
        window.location.href = '/resume'; // Redirect to the Resume page
      }
    } catch (error) {
      console.error('Error creating resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={backgroundStyle}>
      <CssBaseline />
      <AppBarStyled position="fixed">
        <ToolbarStyled>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <ToolbarTitle variant="h6" noWrap>
            Resume Builder
          </ToolbarTitle>
          <Button color="inherit" onClick={handlePrint}>
            Print Resume
          </Button>
        </ToolbarStyled>
      </AppBarStyled>
      <DrawerStyled
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
      >
        <DrawerPaperStyled>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <List>
            <ListItem button>
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary="Personal Information" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><DescriptionIcon /></ListItemIcon>
              <ListItemText primary="Summary" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><ContactMailIcon /></ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><WorkIcon /></ListItemIcon>
              <ListItemText primary="Experience" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><AddBoxIcon /></ListItemIcon>
              <ListItemText primary="Skills" />
            </ListItem>
          </List>
        </DrawerPaperStyled>
      </DrawerStyled>
      <Container component="main" maxWidth="md" sx={{ marginTop: '80px' }}>
        <PaperStyled>
          <Typography variant="h4" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                fullWidth
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Avatar alt="User" src="/static/images/avatar/1.jpg" sx={{ width: 60, height: 60, marginRight: 1 }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Current Position"
                fullWidth
                value={currentPosition}
                onChange={(e) => setCurrentPosition(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Current Length (Years)"
                fullWidth
                type="number"
                value={currentLength}
                onChange={(e) => setCurrentLength(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Current Technologies"
                fullWidth
                value={currentTechnologies}
                onChange={(e) => setCurrentTechnologies(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setHeadShot(e.target.files[0])}
              />
            </Grid>
          </Grid>
        </PaperStyled>

        <PaperStyled sx={{ marginTop: '16px' }}>
          <Typography variant="h4" gutterBottom>
            Skills
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <Select
                label="Add Skill"
                fullWidth
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="JavaScript">JavaScript</MenuItem>
                <MenuItem value="React">React</MenuItem>
                <MenuItem value="Node.js">Node.js</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAddSkill}
                sx={{ marginTop: 2 }}
              >
                Add Skill
              </Button>
            </Grid>
          </Grid>
          <Skills skills={skills} />
        </PaperStyled>

        <PaperStyled sx={{ marginTop: '16px' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFormSubmit}
            sx={{ marginTop: 2 }}
          >
            Create Resume
          </Button>
        </PaperStyled>

        {loading && <Loading />} {/* Show loading indicator while submitting */}
      </Container>
    </div>
  );
}

export default Home;
