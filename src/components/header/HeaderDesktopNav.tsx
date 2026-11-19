import { HeaderNavLinks } from './HeaderNavLinks';

export function HeaderDesktopNav() {
    return (
        <nav className="header-desktop-nav" aria-label="Navigation principale">
            <ul className="header-desktop-list">
                <HeaderNavLinks />
            </ul>
        </nav>
    );
}