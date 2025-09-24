'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    login(role);
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Select your role to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={role} onValueChange={(value) => setRole(value as 'user' | 'admin')}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="user" id="user" />
              <Label htmlFor="user">User</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="admin" id="admin" />
              <Label htmlFor="admin">Admin</Label>
            </div>
          </RadioGroup>
          <Button onClick={handleLogin} className="w-full mt-4">
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
