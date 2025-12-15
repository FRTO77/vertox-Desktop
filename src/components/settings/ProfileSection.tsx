import { useState, useRef } from 'react';
import { 
  User, 
  Camera, 
  Mail, 
  Building2, 
  MapPin,
  Calendar,
  Edit3,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileData {
  name: string;
  email: string;
  company: string;
  location: string;
  joinedDate: string;
  avatar: string | null;
}

export function ProfileSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Alex Johnson',
    email: 'alex@company.com',
    company: 'TechCorp International',
    location: 'San Francisco, CA',
    joinedDate: 'March 2024',
    avatar: null,
  });
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }));
        setEditedProfile(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Profile</h2>
            <p className="text-sm text-muted-foreground">Manage your account details</p>
          </div>
        </div>
        {!isEditing ? (
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsEditing(true)}>
            <Edit3 className="w-4 h-4" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <X className="w-4 h-4" />
            </Button>
            <Button variant="accent" size="sm" className="gap-2" onClick={handleSave}>
              <Check className="w-4 h-4" />
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-border/50">
        <div className="relative group">
          <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
            <AvatarImage src={profile.avatar || undefined} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-2xl font-semibold text-primary-foreground">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <button
            onClick={handleAvatarClick}
            className="absolute inset-0 flex items-center justify-center bg-foreground/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Camera className="w-6 h-6 text-background" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold">{profile.name}</h3>
          <p className="text-muted-foreground">{profile.email}</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Joined {profile.joinedDate}</span>
          </div>
        </div>
      </div>

      {/* Profile Fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            Full Name
          </Label>
          {isEditing ? (
            <Input
              value={editedProfile.name}
              onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
              className="h-11 bg-background/50"
            />
          ) : (
            <div className="h-11 px-3 flex items-center rounded-lg border border-border/50 bg-secondary/30">
              {profile.name}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            Email Address
          </Label>
          {isEditing ? (
            <Input
              type="email"
              value={editedProfile.email}
              onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
              className="h-11 bg-background/50"
            />
          ) : (
            <div className="h-11 px-3 flex items-center rounded-lg border border-border/50 bg-secondary/30">
              {profile.email}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm flex items-center gap-2">
            <Building2 className="w-4 h-4 text-muted-foreground" />
            Company
          </Label>
          {isEditing ? (
            <Input
              value={editedProfile.company}
              onChange={(e) => setEditedProfile(prev => ({ ...prev, company: e.target.value }))}
              className="h-11 bg-background/50"
            />
          ) : (
            <div className="h-11 px-3 flex items-center rounded-lg border border-border/50 bg-secondary/30">
              {profile.company}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            Location
          </Label>
          {isEditing ? (
            <Input
              value={editedProfile.location}
              onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
              className="h-11 bg-background/50"
            />
          ) : (
            <div className="h-11 px-3 flex items-center rounded-lg border border-border/50 bg-secondary/30">
              {profile.location}
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="pt-4 border-t border-border/50">
        <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/20 bg-destructive/5">
          <div>
            <p className="font-medium text-destructive">Delete Account</p>
            <p className="text-sm text-muted-foreground">Permanently remove your account and data</p>
          </div>
          <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
