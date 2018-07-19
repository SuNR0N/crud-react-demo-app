import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

import {
  CategoryActionTypes,
  IAction,
} from '../../../../actions';
import { RouteConfig } from '../../../../config/RouteConfig';
import {
  ICategoryDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import {
  ActionBar,
  ConfirmationModal,
  RoutedButton,
} from '../../../common';

export interface IDispatchProps {
  deleteCategory: (category: ICategoryDTO, link: IHATEOASLink, route?: string) => IAction<CategoryActionTypes.DELETE_CATEGORY_REQUEST>;
  loadCategory: (id: number) => IAction<CategoryActionTypes.LOAD_CATEGORY_REQUEST>;
}

export interface IRouteProps {
  id: number
}

export interface IStateProps {
  category: ICategoryDTO;
}

export interface IState {
  isModalOpen: boolean;
}

export interface IProps extends IDispatchProps, RouteComponentProps<IRouteProps>, IStateProps {}

export class ViewCategoryPage extends React.Component<IProps, IState> {
  public state: IState = {
    isModalOpen: false,
  };
  
  public componentDidMount() {
    this.props.loadCategory(this.props.match.params.id);
  }

  public render() {
    const {
      closeModal,
      deleteCategory,
      props: {
        category,
      },
      showConfirmationModal,
      state: {
        isModalOpen,
      },
    } = this;

    return (
      <div className="container-fluid">
        <h2>View Category</h2>
        <Form>
          <FormGroup row={true}>
            <Label
              id="labelId"
              for="id"
              sm={2}
            >
              ID
            </Label>
            <Col sm={10}>
              <Input
                aria-labelledby="labelId"
                id="id"
                plaintext={true}
              >
                {category.id}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label
              id="labelName"
              for="name"
              sm={2}
            >
              Name
            </Label>
            <Col sm={10}>
              <Input
                aria-labelledby="labelName"
                id="name"
                plaintext={true}
              >
                {category.name}
              </Input>
            </Col>
          </FormGroup>
        </Form>
        <ActionBar>
          {category._links && category._links.update &&
            <RoutedButton
              color="outline-secondary"
              route={RouteConfig.editCategory.replace(':id', String(category.id))}
            >
              Edit
            </RoutedButton>
          }
          {category._links && category._links.delete &&
            <Button
              color="outline-danger"
              onClick={showConfirmationModal}
            >
              Delete
            </Button>
          }
        </ActionBar>
        <ConfirmationModal
          htmlContent={`Are you sure you want to delete <strong>${category.name}</strong> <i>(ID: ${category.id})</i> ?`}
          onConfirm={deleteCategory}
          isOpen={isModalOpen}
          toggle={closeModal}
        />
      </div>
    )
  }

  private closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  }

  private deleteCategory = () => {
    if (this.props.category._links.delete) {
      this.props.deleteCategory(this.props.category, this.props.category._links.delete, RouteConfig.categories);
    }
    this.closeModal();
  }

  private showConfirmationModal = () => {
    this.setState({
      isModalOpen: true,
    });
  }
}