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
                        <th style={{...style.th, width:'50px'}}>STT</th>
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
                            let dateRange = momentRange.range(selectDate.startDate ,selectDate.endDate).snapTo('days').diff('days')
                            dateRange = dateRange !== 0 ? dateRange : 1
                            
                            let price
                            let amount
                            if(room.type === 'Single') {
                                price = props.booking.singlePrice ? parseInt(props.booking.singlePrice) : 0
                                amount = props.booking.singleRoom ? props.booking.singleRoom.length : 0
                            } else if(room.type === 'Twin') {
                                price = props.booking.twinPrice ? parseInt(props.booking.twinPrice) : 0
                                amount = props.booking.twinRoom ? props.booking.twinRoom.length : 0
                            } else if(room.type === 'Triple') {
                                price = props.booking.triplePrice ? parseInt(props.booking.triplePrice) : 0
                                amount = props.booking.tripleRoom ? props.booking.tripleRoom.length : 0
                            } else if(room.type === 'Family') {
                                price = props.booking.familyPrice ? parseInt(props.booking.familyPrice) : 0
                                amount = props.booking.familyRoom ? props.booking.familyRoom.length : 0
                            } else if(room.type === 'Apartment') {
                                price = props.booking.apartmentPrice ? parseInt(props.booking.apartmentPrice) : 0
                                amount = props.booking.apartmentRoom ? props.booking.apartmentRoom.length : 0
                            }

                            totalPrice += price*dateRange*amount

                            return(
                                <tr key={i}>
                                    <td style={style.th}>{i+1}</td>
                                    <td style={{...style.th, textAlign:'left'}}>{room.type}</td>
                                    <td style={{...style.th, textAlign:'left'}}>{moment(selectDate.startDate).format('DD/MM/YYYY')}</td>
                                    <td style={{...style.th, textAlign:'left'}}>{moment(selectDate.endDate).format('DD/MM/YYYY')}</td>
                                    <td style={{...style.th, textAlign:'right'}}>{amount}</td>
                                    <td style={{...style.th, textAlign:'right'}}>{dateRange}</td>
                                    <td style={{...style.th, textAlign:'right'}}>{price}</td>
                                    <td style={{...style.th, textAlign:'right'}}>{price*dateRange*amount}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-between" style={{padding:'5px 5px 0 5px', height:'30px'}}>
                <p><strong>Tổng giá trị:</strong></p>
                <p><strong>{totalPrice}</strong></p>
            </div>
            <div className="d-flex justify-content-between" style={{padding:'5px 5px 0 5px', height:'30px'}}>
                <p><strong>Đã cọc:</strong></p>
                <p>{props.booking.deposit}</p>
            </div>
            <div className="d-flex justify-content-between" style={{padding:'5px 5px 0 5px', height:'30px'}}>
                <p><strong>Còn lại:</strong></p>
                <p><strong>{totalPrice - props.booking.deposit}</strong></p>
            </div>
            <p style={{padding:'0 5px'}}><strong>Bằng chữ: </strong>{toWordS(totalPrice - props.booking.deposit, {lang: 'vi'})} đồng</p>
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
    rooms: state.rooms.filter(room => {
        return room.date ? room.date.find(date => date.bookingid === props.match.params.id) : false
    })
})

export default connect(mapStateToProps)(BookingConfirm)
