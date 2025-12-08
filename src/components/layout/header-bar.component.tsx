import React, { useState } from 'react';
import { Dropdown, theme, Tabs, Divider, Button, Badge, Input, Drawer } from 'antd';
import type { TabsProps } from 'antd';
import { 
  BellOutlined,
  DownOutlined, 
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/auth.slice';
import { env } from '../../config/env';

import styles from './HeaderBar.module.css';
import { filterMenuByPermissions, mapToAntdItems } from '../../utils/filter-menu-permissions';
import { menuItems } from './menu-items';
import type { AppMenuItem } from '../../interfaces/routes.interface';


const { Search } = Input;

const HeaderBar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estados para el menú activo y submenús
  const [activeMainMenu, setActiveMainMenu] = useState<string>('');
  const [activeSubMenu, setActiveSubMenu] = useState<string>('');
  const [showSubNavigation, setShowSubNavigation] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  // Filtrar menús por permisos (puedes pasar los permisos reales aquí)
  const filteredMenu = filterMenuByPermissions(menuItems, []);
  
  // Función para extraer solo los items principales del menú
  const getMainMenuItems = (): AppMenuItem[] => {
    const mainItems: AppMenuItem[] = [];
    
    menuItems.forEach(item => {
      if (item.type === 'group' && item.children) {
        // Para grupos, tomar los hijos como items principales
        item.children.forEach(child => {
          if (child.children) {
            // Item con submenú
            mainItems.push({
              ...child,
              key: child.key as string
            });
          } else {
            // Item simple
            mainItems.push(child);
          }
        });
      } else if (!item.type) {
        // Items directos (no grupos)
        mainItems.push(item);
      }
    });
    
    return mainItems;
  };

  const mainMenuItems = getMainMenuItems();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setDrawerVisible(false);
  };

  // Menú principal (Dropdown del usuario)
  const userMenu = {
    items: [
      {
        key: 'logout',
        label: 'Cerrar sesión',
        icon: <LogoutOutlined />,
        onClick: handleLogout,
      },
    ],
  };

  const handleMainMenuClick = (key: string) => {
    console.log(key);
    const menuItem = mainMenuItems.find(item => item.key === key);
    
    if (menuItem) {
      setActiveMainMenu(key);
      
      // Si el menú tiene subitems, mostrar la barra de tabs
      if (menuItem.children && menuItem.children.length > 0) {
        setShowSubNavigation(true);
        // Seleccionar el primer subitem por defecto
        setActiveSubMenu(menuItem.children[0].key as string);
      } else {
        setShowSubNavigation(false);
        setDrawerVisible(false); // Cerrar drawer al navegar
        // Si no tiene subitems, navegar directamente
        if (key !== '/logout') {
          navigate(key);
        }
      }
      
      console.log('Navegando a menú:', key);
    }
  };

  const handleSubMenuClick = (key: string) => {
    console.log(key);
    setActiveSubMenu(key);
    setDrawerVisible(false); // Cerrar drawer al navegar
    if (key === '/logout') {
      dispatch(logout());
      navigate('/login');
    } else {
      navigate(key);
    }
    console.log('Navegando a submenú:', key);
  };

  // Obtener los subitems del menú activo para las tabs
  const getActiveSubItems = () => {
    const activeMenu = mainMenuItems.find(item => item.key === activeMainMenu);
    return activeMenu?.children || [];
  };

  const tabItems: TabsProps['items'] = getActiveSubItems().map((subItem, index, arr) => ({
    key: subItem.key as string,
    label: (
      <div className={styles.tabLabelWithDivider}>
        <div className={styles.tabLabel}>
          {subItem.icon}
          <span>{subItem.label}</span>
          <Divider type='vertical' style={{ margin:"0 10px"}}/>
        </div>
      </div>
    ),
  }));

  return (
    <div className={styles.headerContainer}>
      {/* Header Principal */}
      <div className={styles.header} style={{ '--bg': colorBgContainer } as any}>
        
        {/* IZQUIERDA - Logo */}
        <div className={styles.left}>
          <img
            src={`${env.baseHref}unillanta.svg`}
            alt="UNILLANTAS logo"
            className={styles.logo}
          />
          <span className={styles.company}>UNILLANTAS</span>
        </div>         

        {/* CENTRO - Navegación Desktop */}
        <div className={styles.center}>
          {/*<Search
            placeholder="Buscar..."
            style={{ width: 200, marginRight: 16 }}
            allowClear
            className={styles.desktopSearch}
          />*/}
          <div className={styles.mainNavigation}>
            {mainMenuItems.map(item => (
              <div
                key={item.key as string}
                className={`${styles.menuItem} ${
                  activeMainMenu === item.key ? styles.menuItemActive : ''
                }`}
                onClick={() => handleMainMenuClick(item.key as string)}
              >
                <div className={styles.menuItemContent}>
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DERECHA - Menú Hamburguesa y Usuario */}
        <div className={styles.right}>
          {/* Menú Hamburguesa Mobile */}
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: '20px' }} />}
            onClick={() => setDrawerVisible(true)}
            className={styles.hamburgerButton}
          />

          {/* Usuario Desktop */}
          <Dropdown menu={userMenu} trigger={['click']} className={styles.desktopUser}>
            <div className={styles.userBox}>
              <img
                src="https://i.pravatar.cc/40"
                alt="user"
                className={styles.avatar}
              />

              <div className={styles.userInfo}>
                <span className={styles.userName}>René Ruiz</span>
                <span className={styles.userEmail}>rene.ruiz@unillantas.com</span>
              </div>
              <DownOutlined className={styles.arrow} />
            </div>
          </Dropdown>
        </div>
      </div>
      
      {/* Subnavegación Desktop */}
      {showSubNavigation && getActiveSubItems().length > 0 && (
        <div className={styles.subNavigation}>
          <div className={styles.subNavigationCenter}>
            <Tabs
              activeKey={activeSubMenu}
              onChange={handleSubMenuClick}
              items={tabItems}
              type="card"
              size="middle"
              className={styles.subTabs}
            />
            <Divider type='vertical'/>
          </div>
        </div>
      )}

      {/* Drawer Mobile */}
      <Drawer
        title={
          <div className={styles.drawerHeader}>
            <img
              src={`${env.baseHref}unillanta.svg`}
              alt="UNILLANTAS logo"
              className={styles.drawerLogo}
            />
            <span>UNILLANTAS</span>
          </div>
        }
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
        className={styles.mobileDrawer}
        styles={{
          header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '16px'
          }
        }}
      >
        {/* Búsqueda Mobile */}
       {/* <div className={styles.drawerSearch}>
          <Search
            placeholder="Buscar..."
            allowClear
          />
        </div>*/}

        {/* Usuario Mobile */}
        <div className={styles.drawerUser}>
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className={styles.drawerAvatar}
          />
          <div className={styles.drawerUserInfo}>
            <span className={styles.drawerUserName}>René Ruiz</span>
            <span className={styles.drawerUserEmail}>rene.ruiz@unillantas.com</span>
          </div>
        </div>

        <Divider />

        {/* Menú Principal Mobile */}
        <div className={styles.drawerMenu}>
          {mainMenuItems.map(item => (
            <div key={item.key as string}>
              <div
                className={`${styles.drawerMenuItem} ${
                  activeMainMenu === item.key ? styles.drawerMenuItemActive : ''
                }`}
                onClick={() => handleMainMenuClick(item.key as string)}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>

              {/* Submenú si está activo */}
              {activeMainMenu === item.key && item.children && item.children.length > 0 && (
                <div className={styles.drawerSubMenu}>
                  {item.children.map(subItem => (
                    <div
                      key={subItem.key as string}
                      className={`${styles.drawerSubMenuItem} ${
                        activeSubMenu === subItem.key ? styles.drawerSubMenuItemActive : ''
                      }`}
                      onClick={() => handleSubMenuClick(subItem.key as string)}
                    >
                      {subItem.icon}
                      <span>{subItem.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <Divider />

        {/* Logout Mobile */}
        <div className={styles.drawerLogout}>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            block
            danger
          >
            Cerrar sesión
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default HeaderBar;