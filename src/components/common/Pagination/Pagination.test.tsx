import { shallow } from 'enzyme';
import React from 'react';
import {
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

import { IHATEOASLink } from '../../../interfaces/HATEOASLink';
import { Icon } from '../Icon';
import {
  IProps,
  Pagination,
} from './Pagination';

describe('Pagination', () => {
  let onPaginateMock: jest.Mock;
  let minProps: IProps;

  beforeEach(() => {
    onPaginateMock = jest.fn();
    minProps = {
      onPaginate: onPaginateMock,
      pageableCollection: {
        content: [],
        currentPage: 1,
        totalItems: 1,
        totalPages: 1,
      },
    };
  });

  it('should apply the "pagination" class name', () => {
    const wrapper = shallow(<Pagination {...minProps}/>);

    expect(wrapper.hasClass('pagination')).toBeTruthy();
  });

  it('should apply the "pagination--disabled" class name if it is disabled', () => {
    const props: IProps = {
      ...minProps,
      disabled: true,
    };
    const wrapper = shallow(<Pagination {...props}/>);

    expect(wrapper.hasClass('pagination--disabled')).toBeTruthy();
  });

  describe('First', () => {
    const first: IHATEOASLink = {
      href: '/first',
      method: 'GET',
    };

    it('should be enabled if the first link exists', () => {
      const props: IProps = {
        ...minProps,
        pageableCollection: {
          ...minProps.pageableCollection,
          _links: {
            first,
          },
        },
      };
      const wrapper = shallow(<Pagination {...props}/>);
      const firstItem = wrapper.find(PaginationItem).at(0);

      expect(firstItem.prop('disabled')).toBeFalsy();
    });

    it('should be disabled if the first link does not exist', () => {
      const wrapper = shallow(<Pagination {...minProps}/>);
      const firstItem = wrapper.find(PaginationItem).at(0);

      expect(firstItem.prop('disabled')).toBeTruthy();
    });

    it('should be disabled if the component is disabled', () => {
      const props: IProps = {
        ...minProps,
        disabled: true,
        pageableCollection: {
          ...minProps.pageableCollection,
          _links: {
            first,
          },
        },
      };
      const wrapper = shallow(<Pagination {...props}/>);
      const firstItem = wrapper.find(PaginationItem).at(0);

      expect(firstItem.prop('disabled')).toBeTruthy();
    });

    it('should call the onNavigate function with the first link when clicked', () => {
      const props: IProps = {
        ...minProps,
        pageableCollection: {
          ...minProps.pageableCollection,
          _links: {
            first,
          },
        },
      };
      const wrapper = shallow(<Pagination {...props}/>);
      const firstLink = wrapper
        .find(PaginationItem).at(0)
        .find(PaginationLink);
      firstLink.simulate('click');

      expect(onPaginateMock).toHaveBeenCalledWith(first);
    });

    it('should render a double left arrow as its icon', () => {
      const wrapper = shallow(<Pagination {...minProps}/>);
      const firstIcon = wrapper
        .find(PaginationItem).at(0)
        .find(Icon);

      expect(firstIcon.prop('symbol')).toBe('angle-double-left-solid');
    });
  });

  describe('Previous', () => {
    const previous: IHATEOASLink = {
      href: '/previous',
      method: 'GET',
    };
    
    it('should be enabled if the previous link exists', () => {
      const props: IProps = {
        ...minProps,
        pageableCollection: {
          ...minProps.pageableCollection,
          _links: {
            previous,
          },
        },
      };
      const wrapper = shallow(<Pagination {...props}/>);
      const previousItem = wrapper.find(PaginationItem).at(1);

      expect(previousItem.prop('disabled')).toBeFalsy();
    });

    it('should be disabled if the previous link does not exist', () => {
      const wrapper = shallow(<Pagination {...minProps}/>);
      const previousItem = wrapper.find(PaginationItem).at(1);

      expect(previousItem.prop('disabled')).toBeTruthy();
    });

    it('should be disabled if the component is disabled', () => {
      const props: IProps = {
        ...minProps,
        disabled: true,
        pageableCollection: {
          ...minProps.pageableCollection,
          _links: {
            previous,
          },
        },
      };
      const wrapper = shallow(<Pagination {...props}/>);
      const previousItem = wrapper.find(PaginationItem).at(1);

      expect(previousItem.prop('disabled')).toBeTruthy();
    });

    it('should call the onNavigate function with the previous link when clicked', () => {
      const props: IProps = {
        ...minProps,
        pageableCollection: {
          ...minProps.pageableCollection,
          _links: {
            previous,
          },
        },
      };
      const wrapper = shallow(<Pagination {...props}/>);
      const previousLink = wrapper
        .find(PaginationItem).at(1)
        .find(PaginationLink);
        previousLink.simulate('click');

      expect(onPaginateMock).toHaveBeenCalledWith(previous);
    });

    it('should render a left arrow as its icon', () => {
      const wrapper = shallow(<Pagination {...minProps}/>);
      const previousIcon = wrapper
        .find(PaginationItem).at(1)
        .find(Icon);

      expect(previousIcon.prop('symbol')).toBe('angle-left-solid');
    });
  });

  describe('Next', () => {
    const next: IHATEOASLink = {
      href: '/next',
      method: 'GET',
    };
    
    it('should be enabled if the next link exists', () => {
      const props: IProps = {
        ...minProps,
        pageableCollection: {
          ...minProps.pageableCollection,
          _links: {
            next,
          },
        },
      };
      const wrapper = shallow(<Pagination {...props}/>);
      const nextItem = wrapper.find(PaginationItem).at(3);

      expect(nextItem.prop('disabled')).toBeFalsy();
    });

    it('should be disabled if the next link does not exist', () => {
      const wrapper = shallow(<Pagination {...minProps}/>);
      const nextItem = wrapper.find(PaginationItem).at(3);

      expect(nextItem.prop('disabled')).toBeTruthy();
    });

    it('should be disabled if the component is disabled', () => {
      const props: IProps = {
        ...minProps,
        disabled: true,
        pageableCollection: {
          ...minProps.pageableCollection,
          _links: {
            next,
          },
        },
      };
      const wrapper = shallow(<Pagination {...props}/>);
      const nextItem = wrapper.find(PaginationItem).at(3);

      expect(nextItem.prop('disabled')).toBeTruthy();
    });

    it('should call the onNavigate function with the next link when clicked', () => {
      const props: IProps = {
        ...minProps,
        pageableCollection: {
          ...minProps.pageableCollection,
          _links: {
            next,
          },
        },
      };
      const wrapper = shallow(<Pagination {...props}/>);
      const nextLink = wrapper
        .find(PaginationItem).at(3)
        .find(PaginationLink);
        nextLink.simulate('click');

      expect(onPaginateMock).toHaveBeenCalledWith(next);
    });

    it('should render a right arrow as its icon', () => {
      const wrapper = shallow(<Pagination {...minProps}/>);
      const nextIcon = wrapper
        .find(PaginationItem).at(3)
        .find(Icon);

      expect(nextIcon.prop('symbol')).toBe('angle-right-solid');
    });
  });

  describe('Last', () => {
    const last: IHATEOASLink = {
      href: '/last',
      method: 'GET',
    };

    it('should be enabled if the last link exists', () => {
      const props: IProps = {
        ...minProps,
        pageableCollection: {
          ...minProps.pageableCollection,
          _links: {
            last,
          },
        },
      };
      const wrapper = shallow(<Pagination {...props}/>);
      const lastItem = wrapper.find(PaginationItem).at(4);

      expect(lastItem.prop('disabled')).toBeFalsy();
    });

    it('should be disabled if the last link does not exist', () => {
      const wrapper = shallow(<Pagination {...minProps}/>);
      const lastItem = wrapper.find(PaginationItem).at(4);

      expect(lastItem.prop('disabled')).toBeTruthy();
    });

    it('should be disabled if the component is disabled', () => {
      const props: IProps = {
        ...minProps,
        disabled: true,
        pageableCollection: {
          ...minProps.pageableCollection,
          _links: {
            last,
          },
        },
      };
      const wrapper = shallow(<Pagination {...props}/>);
      const lastItem = wrapper.find(PaginationItem).at(4);

      expect(lastItem.prop('disabled')).toBeTruthy();
    });

    it('should call the onNavigate function with the last link when clicked', () => {
      const props: IProps = {
        ...minProps,
        pageableCollection: {
          ...minProps.pageableCollection,
          _links: {
            last,
          },
        },
      };
      const wrapper = shallow(<Pagination {...props}/>);
      const lastLink = wrapper
        .find(PaginationItem).at(4)
        .find(PaginationLink);
      lastLink.simulate('click');

      expect(onPaginateMock).toHaveBeenCalledWith(last);
    });

    it('should render a double right arrow as its icon', () => {
      const wrapper = shallow(<Pagination {...minProps}/>);
      const lastIcon = wrapper
        .find(PaginationItem).at(4)
        .find(Icon);

      expect(lastIcon.prop('symbol')).toBe('angle-double-right-solid');
    });
  });

  it('should render the pagination info based on the provided meta properties', () => {
    const props: IProps = {
      ...minProps,
      pageableCollection: {
        content: new Array(7).fill(1),
        currentPage: 3,
        totalItems: 27,
        totalPages: 3,
      },
    };
    const wrapper = shallow(<Pagination {...props}/>);
    const info = wrapper.find('.pagination__info');

    expect(info.text()).toBe('21-27 of 27 items');
  });

  it('should render the pagination info based on the provided meta and pageSize properties', () => {
    const props: IProps = {
      ...minProps,
      pageSize: 5,
      pageableCollection: {
        content: new Array(2).fill(1),
        currentPage: 6,
        totalItems: 27,
        totalPages: 6,
      },
    };
    const wrapper = shallow(<Pagination {...props}/>);
    const info = wrapper.find('.pagination__info');

    expect(info.text()).toBe('26-27 of 27 items');
  });
});
