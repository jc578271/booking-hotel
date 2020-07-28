import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'

import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div style={{marginBottom: '84px'}}>
            <AppBar
                position="fixed"
                style={{
                    background: '#73BEFF',
                    padding: '10px 0'
                }}
            >
                <ToolBar style={{display: 'flex'}}>
                    <Link to="/"><img src="/images/logo.jpg" style={{width:'50px'}} className="rounded-circle" alt="Logo"/></Link>
                </ToolBar>
            </AppBar>
        </div> 
    )
}

export default Header
