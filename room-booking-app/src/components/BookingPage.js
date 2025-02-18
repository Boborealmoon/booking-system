import React, { useState } from 'react';
import { Row, Col, Button, Alert, Container, Modal } from 'react-bootstrap';
import RoomCard from './RoomCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingPage.css';

const mockRooms = [
    // Level 1
    { id: 1, name: 'Classroom 101', floor: 1, availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'], bookings: { 
        '9:00 AM': ['Alice'],
        '10:00 AM': [],
        '11:00 AM': ['Chris'],
        '12:00 PM': [],
        '1:00 PM': ['David'],
        '2:00 PM': []
    }},
    { id: 2, name: 'Classroom 102', floor: 1, availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'], bookings: {
        '9:00 AM': [],
        '10:00 AM': ['Emma'],
        '11:00 AM': [],
        '12:00 PM': ['Frank'],
        '1:00 PM': [],
        '2:00 PM': ['Grace']
    }},
    
    // Level 2
    { id: 3, name: 'Classroom 201', floor: 2, availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'], bookings: {
        '9:00 AM': ['Hannah'],
        '10:00 AM': [],
        '11:00 AM': ['Ian'],
        '12:00 PM': [],
        '1:00 PM': [],
        '2:00 PM': ['Jack']
    }},
    { id: 4, name: 'Classroom 202', floor: 2, availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'], bookings: {
        '9:00 AM': [],
        '10:00 AM': ['Kathy'],
        '11:00 AM': [],
        '12:00 PM': ['Liam'],
        '1:00 PM': [],
        '2:00 PM': []
    }},
    
    // Level 3
    { id: 5, name: 'Classroom 301', floor: 3, availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'], bookings: {
        '9:00 AM': ['Mike'],
        '10:00 AM': [],
        '11:00 AM': ['Nina'],
        '12:00 PM': [],
        '1:00 PM': [],
        '2:00 PM': ['Olivia']
    }},
    { id: 6, name: 'Classroom 302', floor: 3, availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'], bookings: {
        '9:00 AM': [],
        '10:00 AM': ['Paul'],
        '11:00 AM': [],
        '12:00 PM': ['Quinn'],
        '1:00 PM': [],
        '2:00 PM': []
    }},
    
    // Level 4
    { id: 7, name: 'Classroom 401', floor: 4, availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'], bookings: {
        '9:00 AM': ['Rachel'],
        '10:00 AM': [],
        '11:00 AM': ['Sam'],
        '12:00 PM': [],
        '1:00 PM': [],
        '2:00 PM': ['Tina']
    }},
    { id: 8, name: 'Classroom 402', floor: 4, availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'], bookings: {
        '9:00 AM': [],
        '10:00 AM': ['Uma'],
        '11:00 AM': [],
        '12:00 PM': ['Vikram'],
        '1:00 PM': [],
        '2:00 PM': ['Wendy']
    }},

    // Level 5
    { id: 9, name: 'Classroom 501', floor: 5, availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'], bookings: {
        '9:00 AM': ['Alice'],
        '10:00 AM': [],
        '11:00 AM': ['Chris'],
        '12:00 PM': [],
        '1:00 PM': ['David'],
        '2:00 PM': []
    }},
    { id: 10, name: 'Classroom 502', floor: 5, availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'], bookings: {
        '9:00 AM': [],
        '10:00 AM': ['Emma'],
        '11:00 AM': [],
        '12:00 PM': ['Frank'],
        '1:00 PM': [],
        '2:00 PM': ['Grace']
    }},
    
    // Level 6
    { id: 11, name: 'Classroom 601', floor: 6, availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'], bookings: {
        '9:00 AM': ['Hannah'],
        '10:00 AM': [],
        '11:00 AM': ['Ian'],
        '12:00 PM': [],
        '1:00 PM': [],
        '2:00 PM': ['Jack']
    }},
    { id: 12, name: 'Classroom 602', floor: 6, availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'], bookings: {
        '9:00 AM': [],
        '10:00 AM': ['Kathy'],
        '11:00 AM': [],
        '12:00 PM': ['Liam'],
        '1:00 PM': [],
        '2:00 PM': []
    }},
];

const BookingPage = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [bookingMessage, setBookingMessage] = useState('');
    const [bookingError, setBookingError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedFloor, setSelectedFloor] = useState(null); // Set to null to show all initially

    const handleBooking = (room) => {
        setSelectedRoom(room);
        setBookingMessage('');
        setBookingError('');
        setShowModal(true);
    };

    const confirmBooking = (time) => {
        if (selectedRoom) {
            if (selectedRoom.bookings[time].length >= 1) {
                setBookingError(`Sorry, ${selectedRoom.name} at ${time} is fully booked.`);
                return;
            }

            const newBookings = {
                ...selectedRoom.bookings,
                [time]: [...selectedRoom.bookings[time], 'New User']
            };
            const bookedRoom = { ...selectedRoom, bookings: newBookings };
            setBookingMessage(`Successfully booked ${bookedRoom.name} at ${time}`);
            setBookingError('');
            setSelectedRoom(bookedRoom);
        }
    };

    const filteredRooms = selectedFloor !== null 
        ? mockRooms.filter((room) => room.floor === selectedFloor)
        : mockRooms; // Show all rooms if selectedFloor is null

    return (
        <Container className="booking-page">
            <h1 className="text-center my-4">Room Booking</h1>
            <Row>
                <Col sm={3}>
                    <div className="list-group mb-4">
                        <Button className="list-group-item" onClick={() => setSelectedFloor(1)}>Level 1</Button>
                        <Button className="list-group-item" onClick={() => setSelectedFloor(2)}>Level 2</Button>
                        <Button className="list-group-item" onClick={() => setSelectedFloor(3)}>Level 3</Button>
                        <Button className="list-group-item" onClick={() => setSelectedFloor(4)}>Level 4</Button>
                        <Button className="list-group-item" onClick={() => setSelectedFloor(5)}>Level 5</Button>
                        <Button className="list-group-item" onClick={() => setSelectedFloor(6)}>Level 6</Button>
                        <Button className="list-group-item" onClick={() => setSelectedFloor(null)}>Show All</Button>
                    </div>
                </Col>
                <Col sm={9}>
                    <Row>
                        {filteredRooms.map((room) => (
                            <Col key={room.id} sm={4}>
                                <RoomCard room={room} onSelect={handleBooking} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            {/* Booking Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Booking {selectedRoom ? selectedRoom.name : ''}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Select a Date:</h5>
                    <DatePicker 
                        selected={selectedDate} 
                        onChange={(date) => setSelectedDate(date)} 
                        dateFormat="yyyy/MM/dd"
                        className="form-control"
                    />
                    <h5 className="mt-3">Select a time to book:</h5>
                    {selectedRoom && (
                        <ul className="list-unstyled">
                            {selectedRoom.availableTimes.map((time, index) => (
                                <li key={index} className="d-flex justify-content-between align-items-center mb-2">
                                    {time}
                                    <Button 
                                        variant={selectedRoom.bookings[time].length >= 1 ? 'secondary' : 'success'} 
                                        onClick={() => confirmBooking(time)} 
                                        disabled={selectedRoom.bookings[time].length >= 1} 
                                    >
                                        {selectedRoom.bookings[time].length >= 1 ? 'Booked' : 'Confirm Booking'}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                    {bookingMessage && <Alert variant="success" className="mt-4">{bookingMessage}</Alert>}
                    {bookingError && <Alert variant="danger" className="mt-4">{bookingError}</Alert>}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default BookingPage;