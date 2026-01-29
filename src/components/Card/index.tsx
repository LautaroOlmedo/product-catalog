import React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type CardProps = {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
};

export const CardComponent: React.FC<CardProps> = ({
    id,
    name,
    description,
    price,
    stock
}) => {
    const navigate = useNavigate();

    return (
        <Card sx={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
                <Typography variant="h5" sx={{ mb: 1 }}>
                    {name}
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography variant="body2" sx={{ mb: 1 }}>
                    {description}
                </Typography>
                <Typography variant="body1">Price: ${price}</Typography>
                <Typography variant="body1">
                    Stock: {stock > 0 ? stock : 'Out of stock'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`${id}`)}
                >
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};
