import {
  mount,
  shallow,
  ShallowWrapper,
} from 'enzyme';
import React from 'react';
import {
  FormFeedback,
  Input,
} from 'reactstrap';
import { WrappedFieldProps } from 'redux-form';

import { TextField } from './TextField';

describe('TextField', () => {
  describe('given the field is touched', () => {
    const minProps = {
      meta: {
        touched: true,
      },
    } as WrappedFieldProps;

    it('should set the "valid" property to "true" if no error exists', () => {
      const wrapper = shallow(<TextField {...minProps}/>);
      const input = wrapper.find(Input)

      expect(input.prop('valid')).toBe(true);
    });

    it('should set the "valid" property to "false" if an error exists', () => {
      const props: WrappedFieldProps = {
        ...minProps,
         meta: {
          ...minProps.meta,
          error: 'Required',
        },
      };
      const wrapper = shallow(<TextField {...props}/>);
      const input = wrapper.find(Input)

      expect(input.prop('valid')).toBe(false);
    });

    it('should set the "invalid" property to "true" if an error exists', () => {
      const props: WrappedFieldProps = {
        ...minProps,
         meta: {
          ...minProps.meta,
          error: 'Required',
        },
      };
      const wrapper = shallow(<TextField {...props}/>);
      const input = wrapper.find(Input)

      expect(input.prop('invalid')).toBe(true);
    });

    it('should set the "invalid" property to "false" if no error exists', () => {
      const wrapper = shallow(<TextField {...minProps}/>);
      const input = wrapper.find(Input)

      expect(input.prop('invalid')).toBe(false);
    });
  });

  describe('given the field is untouched', () => {
    const minProps = {
      meta: {
        touched: false,
      },
    } as WrappedFieldProps;
    let input: ShallowWrapper;

    beforeEach(() => {
      const wrapper = shallow(<TextField {...minProps}/>);
      input = wrapper.find(Input)
    })

    it('should not set the valid property', () => {
      expect(input.prop('valid')).toBeUndefined();
    });

    it('should not set the invalid property', () => {
      expect(input.prop('invalid')).toBeUndefined();
    });
  });

  it('should display a feedback based on the error if it exists', () => {
    const minProps = {
      meta: {
        error: 'Required',
        touched: false,
      },
    } as WrappedFieldProps;
    const wrapper = mount(<TextField {...minProps}/>);
    const feedback = wrapper.find(FormFeedback);

    expect(feedback.text()).toBe('Required');
  });
});
