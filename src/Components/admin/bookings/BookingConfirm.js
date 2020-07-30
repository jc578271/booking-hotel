import React from 'react'
import { connect } from 'react-redux'
import toWordS from 'written-number'
import moment from 'moment';
import { extendMoment } from 'moment-range';
const momentRange = extendMoment(moment);

const style = {
    table:{
        borderCollapse: 'collapse',
        width: '100%'
    },
    th:{
        borderCollapse: 'collapse',
        border: '1px solid black',
        padding: '5px 5px',
        textAlign: 'center'
    }
    
}

const BookingConfirm = (props) => {
    let totalPrice = 0

    return (
        <div className="container">
            <div>
                <h6>THE SAMSON BOUTIQUE</h6>
                <h6>32/2 Tô Hiến Thành, Q.Sơn Trà, Đà Nẵng</h6>
            </div>
            <br></br>
            <br></br>
            
            <h1 className="text-center">Xác nhận đặt phòng</h1>
            <br></br>

            <p>Ngày: {moment().format('DD/MM/YYYY')}</p>
            <p>Khách/đoàn: {props.booking.name}</p>
            <p>Tên công ty: {props.booking.company}</p>
            <br></br>
            <p>     Kính gửi ôngbà</p>
            <p>Cảm ơn ông/bà đã quan tâm đến khách sạn THE SAMSON BOUTIQUE. Chúng tôi rất vui được thông báo thông tin đặt phòng như sau. Xin vui lòng kiểm tra lại thông tin.</p>
            <br></br>

            <table style={style.table}>
                <thead>
                    <tr>
                        <th style={style.th}>STT</th>
                        <th style={style.th}>Hạng Phòng</th>
                        <th style={style.th}>Check in</th>
                        <th style={style.th}>Check out</th>
                        <th style={style.th}>SL phòng</th>
                        <th style={style.th}>Số đêm</th>
                        <th style={style.th}>Đơn giá</th>
                        <th style={style.th}>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.rooms.map((room, i) => {
                            const selectDate = room.date.find(date => date.bookingid === props.booking.id)
                            const dateRange = momentRange.range(selectDate.startDate ,selectDate.endDate).snapTo('days').diff('days')

                            let price
                            if(room.type === 'Single') {
                                price = props.booking.singlePrice ? parseInt(props.booking.singlePrice) : 0
                            } else if(room.type === 'Twin') {
                                price = props.booking.twinPrice ? parseInt(props.booking.twinPrice) : 0
                            } else if(room.type === 'Triple') {
                                price = props.booking.triplePrice ? parseInt(props.booking.triplePrice) : 0
                            } else if(room.type === 'Family') {
                                price = props.booking.familyPrice ? parseInt(props.booking.familyPrice) : 0
                            } else if(room.type === 'Apartment') {
                                price = props.booking.apartmentPrice ? parseInt(props.booking.apartmentPrice) : 0
                            }

                            totalPrice += price*dateRange

                            return(
                                <tr key={i}>
                                    <td style={style.th}>{i+1}</td>
                                    <td style={{...style.th, textAlign:'left'}}>{room.type}</td>
                                    <td style={{...style.th, textAlign:'left'}}>{moment(selectDate.startDate).format('DD/MM/YYYY')}</td>
                                    <td style={{...style.th, textAlign:'left'}}>{moment(selectDate.endDate).format('DD/MM/YYYY')}</td>
                                    <td style={{...style.th, textAlign:'right'}}>{props.rooms.length}</td>
                                    <td style={{...style.th, textAlign:'right'}}>{dateRange}</td>
                                    <td style={{...style.th, textAlign:'right'}}>{price}</td>
                                    <td style={{...style.th, textAlign:'right'}}>{price*dateRange}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <td style={{padding:'5px 5px', textAlign:'left', fontWeight:'bold'}}>Tổng giá trị:</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{padding:'5px 5px', textAlign:'right', fontWeight:'bold'}}>{totalPrice}</td>
                </tfoot>
            </table>
            <p style={{padding:'0 5px'}}><strong>Bằng chữ: </strong>{toWordS(totalPrice, {lang: 'vi'}) }</p>
            <p style={{padding:'0 5px'}}><strong>Chú ý: </strong>{props.booking.note}</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <div className="d-flex justify-content-between">
                <div style={{padding:'0 40px'}}>
                    <p><strong>Xác nhận của bên A</strong></p>
                </div>
                <div style={{padding:'0 40px'}}>
                    <p><strong>Xác nhận của khách sạn</strong></p>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}

const mapStateToProps = (state, props) => ({
    booking: state.bookings.find(booking => booking.id === props.match.params.id),
    rooms: state.rooms.filter(room => room.linkBooking === props.match.params.id)
})

export default connect(mapStateToProps)(BookingConfirm)
