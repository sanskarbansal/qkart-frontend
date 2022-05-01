import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card" variant="elevation">
      <CardMedia
        component="img"
        image={product.image}
        alt="Product Image"
        height="300"
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography
          variant="subtitle1"
          fontWeight={800}
        >{`$${product.cost}`}</Typography>
        <Rating name="read-only" value={product.rating} readOnly />
        <br />
        <Button variant="contained" onClick={handleAddToCart} fullWidth>
          <AddShoppingCartOutlined />
          ADD TO CART
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
