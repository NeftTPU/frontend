import * as React from 'react'
import { Box, Container, Grid, Link, Typography } from '@mui/material'


const NFTFooter = () => {
    return (
        <Box component="footer" py={4}
             sx={{ background: 'linear-gradient(0, rgba(0,0,0,1) 27%, rgba(255,255,255,0) 100%)' }}>
            <Container maxWidth="lg">
                <Grid container direction="row" alignItems={'center'} justifyContent={'space-between'}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="caption" align="center" color="#5AACE6">
                            Связаться с нами<br/><br/>
                        </Typography>
                        <Typography variant="caption" align="center" color="white" gutterBottom>
                            © 2022 NeFTb. Все права защищены<br/>
                            Сайтом могут пользоваться лица, достигшие 18 лет
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Link variant="body2" href="#" sx={{ color: '#5AACE6' }}>
                            {'Пользовательское соглашение'}
                        </Link>
                        <br/>
                        <Link variant="body2" href="#" sx={{ color: '#5AACE6' }}>
                            {'Политика конфиденциальности'}
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default NFTFooter
