import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import './RoomCard.css'; // Assuming you have a CSS file for custom styles

const RoomCard = ({ room, onSelect }) => {
    return (
        <Card className="m-3 room-card">
            <Card.Body>
                <Card.Title>{room.name}</Card.Title>
                <Card.Text>Available Times:</Card.Text>
                <ul className="list-unstyled">
                    {room.availableTimes.map((time, index) => (
                        <li key={index} className="mb-2">
                            {time}
                            {room.bookings && room.bookings[time] && room.bookings[time].length > 0 ? (
                                <Badge bg="secondary" className="ms-2">
                                    Booked by: {room.bookings[time].join(', ')}
                                </Badge>
                            ) : (
                                <Badge bg="success" className="ms-2">
                                    Available
                                </Badge>
                            )}
                        </li>
                    ))}
                </ul>
                <Button variant="primary" onClick={() => onSelect(room)}>Book Now</Button>
            </Card.Body>
        </Card>
    );
};

export default RoomCard;