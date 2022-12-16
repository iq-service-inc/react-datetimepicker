import { hot } from 'react-hot-loader/root'
import React, { useState } from 'react'
import { IntlProvider } from 'react-intl'
import { Typography, AppBar, Toolbar, IconButton, Card, CardHeader, CardContent, Grid, Switch, Paper, FormControlLabel, Checkbox } from '@material-ui/core'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import GitHubIcon from '@material-ui/icons/GitHub'
import Datetimepicker from './Datetimepicker'

const theme = createTheme({
    overrides: {
        MuiCardHeader: {
            root: {
                paddingBottom: 0
            },
            action: {
                margin: '0px !important'
            }
        }
    }
})

function App(props) {
    const { intl: { language } } = props

    // example 1
    const [basic, setBasic] = useState((new Date()).toISOString())
    // example 2
    const [autofocus, setAutofocus] = useState((new Date()).toISOString())
    // example 3
    const [limited, setLimited] = useState((new Date()).toISOString())
    // example 4
    const [partial, setPartial] = useState((new Date()).toISOString())
    const [notime, setNotime] = useState(false)
    // example 5
    const [disabled, setDisabled] = useState((new Date()).toISOString())
    const [disabledItems, setDisabledItems] = useState({
        year: false,
        month: false,
        date: false,
        ampm: false,
        hour: false,
        min: false
    })
    const handleChange = (event) => setDisabledItems({ ...disabledItems, [event.target.name]: !event.target.checked })

    const sevendaysBefore = (new Date((new Date()).getTime() - 86400 * 1000 * 7)).toISOString()
    console.log('sevendaysBefore', sevendaysBefore)
    const sevendaysAfter = (new Date((new Date()).getTime() + 86400 * 1000 * 7)).toISOString()
    console.log('sevendaysAfter', sevendaysAfter)

    return (
        <IntlProvider defaultLocale='zh' {...language}>
            <ThemeProvider theme={theme}>
                <AppBar>
                    <Toolbar>
                        <Typography variant='h4' style={{ margin: 8 }}>
                            @iqs/react-datetimepicker
                        </Typography>
                        <IconButton
                            style={{ marginLeft: 'auto' }}
                            size='medium'
                            color='inherit'
                            href='https://github.com/iq-service-inc/react-datetimepicker'
                        >
                            <GitHubIcon fontSize='large' />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Toolbar style={{ marginBottom: 8 }} />
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Card variant='outlined' style={{ height: '100%' }}>
                            <CardHeader title='基本使用' />
                            <CardContent>
                                <Typography variant='body1' gutterBottom>
                                    在 <code>value</code> 中傳入要顯示的值，
                                    可以搭配 <code>onChange</code> 更改
                                    <br /><br />
                                </Typography>
                                <Datetimepicker
                                    value={basic}
                                    onChange={value => setBasic(value)}
                                />
                                <Typography variant='body1' style={{ marginTop: 16 }}>
                                    Value: {basic}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card variant='outlined'>
                            <CardHeader title={<code>autofocus</code>} />
                            <CardContent>
                                <Typography variant='body1' gutterBottom>
                                    當 <code>autofocus</code> 為 <code>true</code> 時，
                                    在網頁載入後，將會直接 focus 到這個 component
                                    <br /><br />
                                </Typography>
                                <Datetimepicker
                                    value={autofocus}
                                    onChange={value => setAutofocus(value)}
                                    autofocus
                                />
                                <Typography variant='body1' style={{ marginTop: 16 }}>
                                    Value: {limited}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card variant='outlined'>
                            <CardHeader title='時間最小值與最大值' />
                            <CardContent>
                                <Typography variant='body1' gutterBottom>
                                    時間範圍可以用 <code>min</code> 與 <code>max</code> 限制，
                                    在這個範例中，時間範圍將會被限制在今天前後七天
                                </Typography>
                                <Datetimepicker
                                    value={limited}
                                    onChange={value => setLimited(value)}
                                    min={sevendaysBefore}
                                    max={sevendaysAfter}
                                />
                                <Typography variant='body1' style={{ marginTop: 16 }}>
                                    Value: {limited}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card variant='outlined'>
                            <CardHeader
                                title='開關部份功能-1'
                                action={
                                    <Grid component='label' container alignItems='center' spacing={1}>
                                        <Grid item><code>nodate</code></Grid>
                                        <Switch checked={notime} onChange={e => setNotime(e.target.checked)} />
                                        <Grid item><code>notime</code></Grid>
                                    </Grid>
                                } />
                            <CardContent>
                                <Typography variant='body1' gutterBottom>
                                    如果只希望使用者設定日期或時間，
                                    可以透過 <code>nodate</code> 或 <code>notime</code>
                                    將對應的功能關閉
                                    <br />
                                    使用右上角的開關測試效果
                                </Typography>
                                <Datetimepicker
                                    value={partial}
                                    onChange={value => setPartial(value)}
                                    notime={notime}
                                    nodate={!notime}
                                />
                                <Typography variant='body1' style={{ marginTop: 16 }}>
                                    Value: {partial}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card variant='outlined'>
                            <CardHeader title='開關部份功能-2' />
                            <CardContent>
                                <Typography variant='body1' gutterBottom>
                                    如果想要限制部份輸入項目，不讓使用者進行更改，
                                    可以使用 <code>disabled</code> 進行設定，
                                    詳細設定方法見 <a href='https://github.com/iq-service-inc/react-datetimepicker#datetimepicker-props'>
                                        README 中的 <code>props</code>
                                    </a>
                                    <br />
                                    下面的範例中，打勾為啟用的功能，取消打勾則會關閉該功能
                                </Typography>
                                <Paper variant='outlined' style={{ width: '100%', padding: 8, marginBottom: 8 }}>
                                    <FormControlLabel
                                        control={<Checkbox checked={!disabledItems.year} onChange={handleChange} name='year' />}
                                        label={<code>year</code>}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={!disabledItems.month} onChange={handleChange} name='month' />}
                                        label={<code>month</code>}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={!disabledItems.date} onChange={handleChange} name='date' />}
                                        label={<code>date</code>}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={!disabledItems.ampm} onChange={handleChange} name='ampm' />}
                                        label={<code>ampm</code>}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={!disabledItems.hour} onChange={handleChange} name='hour' />}
                                        label={<code>hour</code>}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={!disabledItems.min} onChange={handleChange} name='min' />}
                                        label={<code>min</code>}
                                    />
                                </Paper>
                                <Datetimepicker
                                    value={disabled}
                                    onChange={value => setDisabled(value)}
                                    disabled={Object.keys(disabledItems).filter(k => disabledItems[k])}
                                />
                                <Typography variant='body1' style={{ marginTop: 16 }}>
                                    Value: {partial}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </IntlProvider>
    )
}

export default hot(App)
