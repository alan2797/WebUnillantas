import React, { useState } from 'react';
import { Dropdown, theme, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { 
  DownOutlined, 
  LogoutOutlined, 
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  TeamOutlined,
  ProductOutlined,
  FolderOutlined,
  DatabaseOutlined,
  TruckOutlined,
  FileTextOutlined,
  UserOutlined,
  LineChartOutlined,
  PieChartOutlined,
  ShopOutlined,
  DollarOutlined,
  ContainerOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/auth.slice';
import { env } from '../../config/env';

import styles from './HeaderBar.module.css';

const HeaderBar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estados para el menú activo y submenús
  const [activeMainMenu, setActiveMainMenu] = useState<string>('dashboard');
  const [activeSubMenu, setActiveSubMenu] = useState<string>('dashboard-main');
  const [showSubNavigation, setShowSubNavigation] = useState<boolean>(true);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Menú principal (Dropdown del usuario)
  const userMenu = {
    items: [
      {
        key: 'theme',
        label: 'Tema',
        onClick: () => console.log('Cambiar tema'),
      },
      {
        key: 'logout',
        label: 'Cerrar sesión',
        icon: <LogoutOutlined />,
        onClick: handleLogout,
      },
    ],
  };

  // Estructura de menús principales con sus subitems e iconos
  const mainMenuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardOutlined />,
      subItems: [
        { 
          key: 'dashboard-main', 
          label: 'Principal', 
          icon: <DashboardOutlined /> 
        },
        { 
          key: 'dashboard-analytics', 
          label: 'Analíticas', 
          icon: <LineChartOutlined /> 
        },
        { 
          key: 'dashboard-reports', 
          label: 'Reportes', 
          icon: <PieChartOutlined /> 
        },
      ]
    },
    {
      key: 'inventory',
      label: 'Inventario',
      icon: <AppstoreOutlined />,
      subItems: [
        { 
          key: 'inventory-products', 
          label: 'Productos', 
          icon: <ProductOutlined /> 
        },
        { 
          key: 'inventory-categories', 
          label: 'Categorías', 
          icon: <FolderOutlined /> 
        },
        { 
          key: 'inventory-stock', 
          label: 'Stock', 
          icon: <DatabaseOutlined /> 
        },
        { 
          key: 'inventory-suppliers', 
          label: 'Proveedores', 
          icon: <TruckOutlined /> 
        },
      ]
    },
    {
      key: 'sales',
      label: 'Ventas',
      icon: <ShoppingCartOutlined />,
      subItems: [
        { 
          key: 'sales-orders', 
          label: 'Pedidos', 
          icon: <FileTextOutlined /> 
        },
        { 
          key: 'sales-customers', 
          label: 'Clientes', 
          icon: <UserOutlined /> 
        },
        { 
          key: 'sales-invoices', 
          label: 'Facturas', 
          icon: <DollarOutlined /> 
        },
        { 
          key: 'sales-returns', 
          label: 'Devoluciones', 
          icon: <ContainerOutlined /> 
        },
      ]
    },
    {
      key: 'reports',
      label: 'Reportes',
      icon: <BarChartOutlined />,
      subItems: [
        { 
          key: 'reports-financial', 
          label: 'Financieros', 
          icon: <DollarOutlined /> 
        },
        { 
          key: 'reports-sales', 
          label: 'Ventas', 
          icon: <ShoppingCartOutlined /> 
        },
        { 
          key: 'reports-inventory', 
          label: 'Inventario', 
          icon: <AppstoreOutlined /> 
        },
      ]
    },
    {
      key: 'users',
      label: 'Usuarios',
      icon: <TeamOutlined />,
      subItems: [
        { 
          key: 'users-list', 
          label: 'Lista de Usuarios', 
          icon: <UserOutlined /> 
        },
        { 
          key: 'users-roles', 
          label: 'Roles', 
          icon: <TeamOutlined /> 
        },
      ]
    },
  ];

  const handleMainMenuClick = (key: string) => {
    const menuItem = mainMenuItems.find(item => item.key === key);
    
    if (menuItem) {
      setActiveMainMenu(key);
      
      // Si el menú tiene subitems, mostrar la barra de tabs
      if (menuItem.subItems && menuItem.subItems.length > 0) {
        setShowSubNavigation(true);
        // Seleccionar el primer subitem por defecto
        setActiveSubMenu(menuItem.subItems[0].key);
      } else {
        setShowSubNavigation(false);
      }
      
      console.log('Navegando a menú:', key);
    }
  };

  const handleSubMenuClick = (key: string) => {
    setActiveSubMenu(key);
    console.log('Navegando a submenú:', key);
  };

  // Obtener los subitems del menú activo para las tabs
  const getActiveSubItems = () => {
    const activeMenu = mainMenuItems.find(item => item.key === activeMainMenu);
    return activeMenu?.subItems || [];
  };

  // Configurar las tabs con iconos
  const tabItems: TabsProps['items'] = getActiveSubItems().map(subItem => ({
    key: subItem.key,
    label: (
      <div className={styles.tabLabel}>
        {subItem.icon}
        <span>{subItem.label}</span>
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
          <div className={styles.mainNavigation}>
            {mainMenuItems.map(item => (
              <div
                key={item.key}
                className={`${styles.menuItem} ${
                  activeMainMenu === item.key ? styles.menuItemActive : ''
                }`}
                onClick={() => handleMainMenuClick(item.key)}
              >
                <div className={styles.menuItemContent}>
                  {item.icon}
                  <span>{item.label}</span>
                 {/*  {item.subItems && item.subItems.length > 0 && (
                    <DownOutlined className={styles.dropdownArrow} />
                  )} */}
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
              items={tabItems}
              type="card"
              size="small"
              className={styles.subTabs}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderBar;