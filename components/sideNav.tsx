import Logo from './logo';
import MoreDropdown from './moreDropdown';
import NavLinks from './navLinks';

export default function SideNav() {
  return (
    <div>
      <div>
        <Logo />
        <NavLinks />
        <div>
          <MoreDropdown />
        </div>
      </div>
    </div>
  );
}
