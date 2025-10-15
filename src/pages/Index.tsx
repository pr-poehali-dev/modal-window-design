import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import EditProfileModal from '@/components/EditProfileModal';

const Index = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    name: 'Александр Иванов',
    email: 'aleksandr.ivanov@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander'
  });

  const tabs = [
    { id: 'profile', label: 'Профиль', icon: 'User' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' },
    { id: 'notifications', label: 'Уведомления', icon: 'Bell' },
    { id: 'security', label: 'Безопасность', icon: 'Shield' }
  ];

  const handleSaveProfile = (data: { name: string; email: string; avatar: string }) => {
    setUserData(data);
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Личный кабинет</h1>
            <Avatar className="h-10 w-10">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon name={tab.icon as any} size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'profile' && (
          <div className="animate-slide-up">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Информация профиля</h2>
                  <p className="text-sm text-gray-500">Управляйте своими персональными данными</p>
                </div>
                <Button onClick={() => setIsEditModalOpen(true)}>
                  <Icon name="Edit" size={16} className="mr-2" />
                  Редактировать профиль
                </Button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="text-2xl">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{userData.name}</h3>
                    <p className="text-sm text-gray-500">Пользователь системы</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1">Полное имя</dt>
                      <dd className="text-base text-gray-900">{userData.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1">Email адрес</dt>
                      <dd className="text-base text-gray-900">{userData.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1">Должность</dt>
                      <dd className="text-base text-gray-900">Старший менеджер</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1">Отдел</dt>
                      <dd className="text-base text-gray-900">Продажи</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Card>

            <Card className="p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Дополнительная информация</h3>
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">Телефон</dt>
                  <dd className="text-base text-gray-900">+7 (999) 123-45-67</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">Офис</dt>
                  <dd className="text-base text-gray-900">Москва, БЦ "Столица"</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">Дата регистрации</dt>
                  <dd className="text-base text-gray-900">15 января 2024</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">Часовой пояс</dt>
                  <dd className="text-base text-gray-900">UTC+3 (Москва)</dd>
                </div>
              </dl>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="animate-slide-up">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Настройки приложения</h2>
              <p className="text-gray-500">Настройки пока не реализованы</p>
            </Card>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="animate-slide-up">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Управление уведомлениями</h2>
              <p className="text-gray-500">Уведомления пока не настроены</p>
            </Card>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="animate-slide-up">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Безопасность аккаунта</h2>
              <p className="text-gray-500">Настройки безопасности в разработке</p>
            </Card>
          </div>
        )}
      </main>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={userData}
      />
    </div>
  );
};

export default Index;
