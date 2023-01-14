import { Component, useState } from 'react';

import Food from '../../components/Food';
import { Header } from '../../components/Header';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { NewDishModal } from '../../components/NewDishModal';
import { api } from '../../services/api';
import { FoodsContainer } from './styles';

export function Dashboard() {
  constructor(props) {
    super(props);
    this.state = {
      foods: [],
      editingFood: {},
      modalOpen: false,
      editModalOpen: false,
    }
  }

  async componentDidMount() {
    const response = await api.get('/foods');

    this.setState({ foods: response.data });
  }

  handleAddFood = async food => {
    const { foods } = this.state;

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      this.setState({ foods: [...foods, response.data] });
    } catch (err) {
      console.log(err);
    }
  }

  handleUpdateFood = async food => {
    const { foods, editingFood } = this.state;

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      this.setState({ foods: foodsUpdated });
    } catch (err) {
      console.log(err);
    }
  }

  handleDeleteFood = async id => {
    const { foods } = this.state;

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    this.setState({ foods: foodsFiltered });
  }

  toggleModal = () => {
    const { modalOpen } = this.state;

    this.setState({ modalOpen: !modalOpen });
  }

  toggleEditModal = () => {
    const { editModalOpen } = this.state;

    this.setState({ editModalOpen: !editModalOpen });
  }

  handleEditFood = food => {
    this.setState({ editingFood: food, editModalOpen: true });
  }


    const { modalOpen, editModalOpen, editingFood, foods } = this.state;


    const [isNewDishModalOpen, setIsNewDishModalOpen] = useState(false);

    function handleOpenNewDishModal() {
      setIsNewDishModalOpen(true);
    }

    function handleCloseNewDishModal() {
      setIsNewDishModalOpen(false);
    }

    return (
      <>
        <Header onOpenNewDishModal={handleOpenNewDishModal} />

        <NewDishModal
          isOpen={isNewDishModalOpen}
          onRequestClose={handleCloseNewDishModal}
        />

        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={this.toggleModal}
          handleAddFood={this.handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={this.toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={this.handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={this.handleDeleteFood}
                handleEditFood={this.handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
};

