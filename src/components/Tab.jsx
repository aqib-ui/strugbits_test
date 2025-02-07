import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const WeekTabs = ({ activeWeek, onSelectWeek }) => {
    const weeks = [1, 2, 3, 4];
    const [value, setValue] = React.useState(activeWeek === "all" ? 0 : parseInt(activeWeek.replace('week', '')));

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const selectedWeek = newValue === 0 ? "all" : `week${newValue}`;
        onSelectWeek(selectedWeek);
    };

    return (
        <Box sx={{ maxWidth: { xs: 380, sm: 680 }, display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons={false}
                aria-label="week tabs"
                sx={{
                    marginBottom: '20px',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    '& .MuiTabs-scroller': {
                        overflowX: 'auto',
                    },
                    '& .MuiTab-root': {
                        minWidth: 120,
                    },
                }}
            >
                <Tab
                    label="All Meals"
                    sx={{
                        fontWeight: 'bold',
                        borderBottom: value === 0 ? '2px solid #175d7f' : 'none',
                        padding: '10px 20px',
                        color: value === 0 ? '#175d7f' : 'black',
                        '&.Mui-selected': {
                            color: '#175d7f',
                        },
                    }}
                />
                {weeks.map((week) => (
                    <Tab
                        key={week}
                        label={`Week ${week}`}
                        sx={{
                            fontWeight: 'bold',
                            borderBottom: value === week ? '2px solid #175d7f' : 'none',
                            padding: '10px 20px',
                            color: value === week ? '#175d7f' : 'black',
                            '&.Mui-selected': {
                                color: '#175d7f',
                            },
                        }}
                    />
                ))}
            </Tabs>
        </Box>
    );
};

export default WeekTabs;
