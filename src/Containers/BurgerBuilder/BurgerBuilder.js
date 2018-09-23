import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.6,
    cheese: 0.9,
    meat: 1.5
};
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false
    }

    setPurchaseable = (newPrice) => {
        if (newPrice > 4) {
            this.setState({ purchaseable: true })
        } else {
            this.setState({ purchaseable: false });
        }
    }

    addIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.setPurchaseable(newPrice);

    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = updatedCount;
            const priceDeduction = INGREDIENT_PRICE[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
            this.setPurchaseable(newPrice);

        }

    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientsAdded={this.addIngredientHandler}
                    ingredientDeduction={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;