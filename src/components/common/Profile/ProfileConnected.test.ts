import { actions } from '../../../actions/AuthActions';
import { mapDispatchToProps } from './ProfileConnected';

describe('ProfileConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the logout function', () => {
      const dispatchMock = jest.fn();
      const logOutSpy = jest.spyOn(actions, 'logOut');
      const { logout } = mapDispatchToProps(dispatchMock);
      logout();

      expect(logOutSpy).toHaveBeenCalled();
    });
  });
});
