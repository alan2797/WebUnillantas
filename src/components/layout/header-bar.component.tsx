import React, { useState } from 'react';
import { Dropdown, theme, Tabs, Divider, Button, Badge, Input } from 'antd';
import type { TabsProps } from 'antd';
import { 
  BellOutlined,
  DownOutlined, 
  LogoutOutlined
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

  // Configurar las tabs con iconos
  /* const tabItems: TabsProps['items'] = getActiveSubItems().map(subItem => ({
    key: subItem.key as string,
    label: (
      <div className={styles.tabLabel}>
        {subItem.icon}
        <span>{subItem.label}</span>
      </div>
    ),
  })); */
  const tabItems: TabsProps['items'] = getActiveSubItems().map((subItem, index, arr) => ({
  key: subItem.key as string,
  label: (
    <div className={styles.tabLabelWithDivider}>
      <div className={styles.tabLabel}>
        {subItem.icon}
        <span>{subItem.label}</span>
         <Divider type='vertical' style={{ margin:"0 10px"}}/>
      </div>
           

      {/* Divider vertical entre items excepto el último */}
      {/* {index !== arr.length - 1 && <div className={styles.vDivider} />} */}
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

        {/* CENTRO - Navegación Principal */}
        <div className={styles.center}>
          <Search
            placeholder="Buscar..."
            style={{ width: 200, marginRight: 16 }}
            allowClear
          />
          <div className={styles.mainNavigation}>
            {mainMenuItems.map(item => (
              <div
                key={item.key as string}
                className={`${styles.menuItem} ${
                  activeMainMenu === item.key ? styles.menuItemActive : 'asds'
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

        {/* DERECHA - Usuario */}
        <div className={styles.right}>
          <Dropdown menu={userMenu} trigger={['click']}>
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

      {/* Barra de Sub Navegación (Tabs) - Centrada con iconos */}
      {showSubNavigation && getActiveSubItems().length > 0 && (
        <div className={styles.subNavigation}>
          <div className={styles.subNavigationCenter}>
            <Tabs
              activeKey={activeSubMenu}
              onChange={handleSubMenuClick}
              onTabClick={(key) => {
                console.log("Click en tab:", key);
                setActiveSubMenu(key);
                handleSubMenuClick(key); // opcional
              }}
              items={tabItems}
              type="card"
              size="small"
              className={styles.subTabs}
            />
            <Divider type='vertical'/>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderBar;