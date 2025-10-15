import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; email: string; avatar: string }) => void;
  initialData: { name: string; email: string; avatar: string };
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const EditProfileModal = ({ isOpen, onClose, onSave, initialData }: EditProfileModalProps) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(initialData.name);
      setEmail(initialData.email);
      setAvatar(initialData.avatar);
      setPassword('');
      setErrors({});
      setTouched({});
    }
  }, [isOpen, initialData]);

  const validateName = (value: string): string | undefined => {
    if (!value.trim()) {
      return 'Имя обязательно для заполнения';
    }
    if (value.trim().length < 2) {
      return 'Имя должно содержать минимум 2 символа';
    }
    return undefined;
  };

  const validateEmail = (value: string): string | undefined => {
    if (!value.trim()) {
      return 'Email обязателен для заполнения';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Введите корректный email адрес';
    }
    return undefined;
  };

  const validatePassword = (value: string): string | undefined => {
    if (value && value.length < 6) {
      return 'Пароль должен содержать минимум 6 символов';
    }
    return undefined;
  };

  const handleFieldBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    
    let error: string | undefined;
    if (field === 'name') {
      error = validateName(name);
    } else if (field === 'email') {
      error = validateEmail(email);
    } else if (field === 'password') {
      error = validatePassword(password);
    }

    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    const newErrors: FormErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, password: true });

    if (!nameError && !emailError && !passwordError) {
      setTimeout(() => {
        onSave({ name, email, avatar });
        toast({
          title: 'Профиль обновлён',
          description: 'Изменения успешно сохранены',
          className: 'bg-success text-white',
        });
        setIsSubmitting(false);
      }, 800);
    } else {
      setIsSubmitting(false);
      toast({
        title: 'Ошибка валидации',
        description: 'Пожалуйста, исправьте ошибки в форме',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    setName(initialData.name);
    setEmail(initialData.email);
    setPassword('');
    setErrors({});
    setTouched({});
    onClose();
  };

  const getInputClassName = (field: string, hasError: boolean) => {
    if (!touched[field]) return '';
    return hasError ? 'border-destructive focus-visible:ring-destructive' : 'border-success focus-visible:ring-success';
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-[500px] animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Редактировать профиль</DialogTitle>
          <DialogDescription>
            Внесите изменения в свой профиль. Нажмите "Сохранить" когда закончите.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="text-2xl">
                  {name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                title="Загрузить фото"
              >
                <Icon name="Camera" size={14} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Полное имя <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => handleFieldBlur('name')}
                  className={getInputClassName('name', !!errors.name)}
                  placeholder="Введите ваше имя"
                  disabled={isSubmitting}
                />
                {touched.name && errors.name && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Icon name="AlertCircle" size={18} className="text-destructive" />
                  </div>
                )}
                {touched.name && !errors.name && name && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Icon name="CheckCircle" size={18} className="text-success" />
                  </div>
                )}
              </div>
              {touched.name && errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Icon name="AlertCircle" size={14} />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email адрес <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleFieldBlur('email')}
                  className={getInputClassName('email', !!errors.email)}
                  placeholder="example@company.com"
                  disabled={isSubmitting}
                />
                {touched.email && errors.email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Icon name="AlertCircle" size={18} className="text-destructive" />
                  </div>
                )}
                {touched.email && !errors.email && email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Icon name="CheckCircle" size={18} className="text-success" />
                  </div>
                )}
              </div>
              {touched.email && errors.email && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Icon name="AlertCircle" size={14} />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Новый пароль
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleFieldBlur('password')}
                  className={getInputClassName('password', !!errors.password)}
                  placeholder="Минимум 6 символов"
                  disabled={isSubmitting}
                />
                {touched.password && errors.password && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Icon name="AlertCircle" size={18} className="text-destructive" />
                  </div>
                )}
                {touched.password && !errors.password && password && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Icon name="CheckCircle" size={18} className="text-success" />
                  </div>
                )}
              </div>
              {touched.password && errors.password && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Icon name="AlertCircle" size={14} />
                  {errors.password}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Оставьте пустым, если не хотите менять пароль
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
              disabled={isSubmitting}
            >
              Отменить
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Сохранение...
                </>
              ) : (
                <>
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
