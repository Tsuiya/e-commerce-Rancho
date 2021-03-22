import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import CartItem from './Cartitem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant='Subtitle1' >Você ainda não possui itens no carrinho,
        <Link to='/' className={classes.link} > comece adicionando algumas coisas.</Link>!
        </Typography>
    );

    const FilledCart = () => (
        <>
        <Grid container spacing={3} >
            {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id} >
                    <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                </Grid>
            ) )}
        </Grid>
        <div className={classes.cardDetails} >
                <Typography variant='h4' >Subtotal: { cart.subtotal.formatted_with_symbol }</Typography>
                <div>
                    <Button className={classes.EmptyButton} size='large' type='button' variant='contained' color='Secondary' onClick={handleEmptyCart} >Esvaziar</Button>
                    <Button component={Link} to='/checkout' className={classes.CheckoutButton} size='large' type='button' variant='contained' color='Primary' >Confirmar</Button>
                </div>
        </div>
        </>
    );

    if(!cart.line_items) return 'Carregando...';

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant='h3' gutterBottom >Seu carrinho</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
        </Container>
    )
}

export default Cart
