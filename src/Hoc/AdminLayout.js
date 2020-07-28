import React from 'react'
import AdminNav from '../Components/admin/nav/AdminNav'

const AdminLayout = (props) => {
    return (
        <div style={{margin: '0', padding: '0', width:'94vw'}}>
            <div className="row" >
                <div className="col-2" style={{background:'#FFEE81', margin: '0', padding: '0', minHeight: '88vh'}}>
                    <AdminNav/>
                </div>
                <div className="col-10" style={{margin: '0', padding: '0'}}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
