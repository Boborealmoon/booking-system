import React, { useState } from 'react';
import { Row, Col, Button, Alert, Container, Modal } from 'react-bootstrap';
import RoomCard from './RoomCard';
import DatePicker from 'react-datepicker'; // Import the DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for DatePicker
import './BookingPage.css'; // Your custom CSS file

const mockRooms = [
    {
        id: 1,
        name: 'Classroom 3-1',
        availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
        bookings: {
            '9:00 AM': ['Bob'],
            '10:00 AM': [],
            '11:00 AM': ['Elisa'],
            '12:00 PM': [],
            '1:00 PM': [],
            '2:00 PM': [],
            '3:00 PM': [],
            '4:00 PM': [],
            '5:00 PM': []
        }
    },
    {
        id: 2,
        name: 'Classroom 3-2',
        availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
        bookings: {
            '9:00 AM': ['Luana'],
            '10:00 AM': [],
            '11:00 AM': [],
            '12:00 PM': [],
            '1:00 PM': [],
            '2:00 PM': ['Krishna'],
            '3:00 PM': [],
            '4:00 PM': [],
            '5:00 PM': ['Anna']
        }
    },
    {
        id: 3,
        name: 'Classroom 3-3',
        availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
        bookings: {
            '9:00 AM': [],
            '10:00 AM': [],
            '11:00 AM': [],
            '12:00 PM': ['Grace'],
            '1:00 PM': [],
            '2:00 PM': ['Putin'],
            '3:00 PM': [],
            '4:00 PM': [],
            '5:00 PM': ['Trump']
        }
    },    {
        id: 4,
        name: 'Classroom 4-1',
        availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
        bookings: {
            '9:00 AM': [],
            '10:00 AM': [],
            '11:00 AM': [],
            '12:00 PM': ['Anna'],
            '1:00 PM': [],
            '2:00 PM': [],
            '3:00 PM': [],
            '4:00 PM': [],
            '5:00 PM': []
        }
    }, 
    {
        id: 5,
        name: 'Classroom 4-2',
        availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
        bookings: {
            '9:00 AM': [],
            '10:00 AM': [],
            '11:00 AM': [],
            '12:00 PM': [],
            '1:00 PM': [],
            '2:00 PM': [],
            '3:00 PM': [],
            '4:00 PM': [],
            '5:00 PM': []
        }
    },
    {
        id: 6,
        name: 'Classroom 4-3',
        availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
        bookings: {
            '9:00 AM': [],
            '10:00 AM': [],
            '11:00 AM': [],
            '12:00 PM': [],
            '1:00 PM': [],
            '2:00 PM': [],
            '3:00 PM': [],
            '4:00 PM': [],
            '5:00 PM': []
        }
    },
];

const BookingPage = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [bookingMessage, setBookingMessage] = useState('');
    const [bookingError, setBookingError] = useState('');
    const [showModal, setShowModal] = useState(false); // Manage modal visibility
    const [selectedDate, setSelectedDate] = useState(new Date()); // Handle date selection

    const handleBooking = (room) => {
        setSelectedRoom(room);
        setBookingMessage('');
        setBookingError('');
        setShowModal(true); // Show the modal when booking
    };

    const confirmBooking = (time) => {
        if (selectedRoom) {
            if (selectedRoom.bookings[time].length >= 1) { // Booking logic
                setBookingError(`Sorry, ${selectedRoom.name} at ${time} is fully booked.`);
                return;
            }

            const newBookings = {
                ...selectedRoom.bookings,
                [time]: [...selectedRoom.bookings[time], 'New User'] // Mock addition of a user
            };
            const bookedRoom = { ...selectedRoom, bookings: newBookings };
            setBookingMessage(`Successfully booked ${bookedRoom.name} at ${time}`);
            setBookingError('');
            setSelectedRoom(bookedRoom); // Update the selected room with the new booking
        }
    };

    return (
        <Container className="booking-page">
            <h1 className="text-center my-4">Room Booking</h1>
            <Row>
                {mockRooms.map((room) => (
                    <Col key={room.id} sm={4}>
                        <RoomCard room={room} onSelect={handleBooking} />
                    </Col>
                ))}
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