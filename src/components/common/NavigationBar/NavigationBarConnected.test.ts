import { actions } from '../../../actions/AuthActions';
import { IProfileDTO } from '../../../interfaces/dtos/ProfileDTO';
import { IRootState } from '../../../reducers/RootState';
import {
  mapDispatchToProps,
  mapStateToProps,
} from './NavigationBarConnected';

describe('NavigationBarConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the loadProfile function', () => {
      const dispatchMock = jest.fn();
      const loadProfileSpy = jest.spyOn(actions, 'loadProfile');
      const { loadProfile } = mapDispatchToProps(dispatchMock);
      loadProfile();

      expect(loadProfileSpy).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('should map the profile', () => {
      const profileMock = {} as IProfileDTO;
      const rootState = {
        auth: {
          profile: profileMock,
        },
      } as any as IRootState;
      const { profile } = mapStateToProps(rootState);

      expect(profile).toBe(profileMock);
    });
  });
});
