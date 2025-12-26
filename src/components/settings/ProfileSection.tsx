import { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Camera, 
  Mail, 
  Building2, 
  MapPin,
  Calendar,
  Edit3,
  Check,
  X,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    email: '',
    company: '',
    location: '',
    joinedDate: '',
    avatar: null,
  });
  const [editedProfile, setEditedProfile] = useState(profile);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      const joinedDate = profileData?.created_at 
        ? new Date(profileData.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : '';

      const newProfile = {
        name: profileData?.full_name || '',
        email: profileData?.email || user.email || '',
        company: profileData?.company || '',
        location: profileData?.location || '',
        joinedDate,
        avatar: profileData?.avatar_url || null,
      };

      setProfile(newProfile);
      setEditedProfile(newProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setProfile(prev => ({ ...prev, avatar: publicUrl }));
      setEditedProfile(prev => ({ ...prev, avatar: publicUrl }));
      toast.success('Avatar updated successfully');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Failed to upload avatar');
    }
  };

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          company: editedProfile.company,
          location: editedProfile.location,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setProfile(prev => ({
        ...prev,
        company: editedProfile.company,
        location: editedProfile.location,
      }));
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="glass-card p-6 flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
              {getInitials(profile.name)}
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
          <h3 className="text-xl font-semibold">{profile.name || 'No name set'}</h3>
          <p className="text-muted-foreground">{profile.email || 'No email'}</p>
          {profile.joinedDate && (
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Joined {profile.joinedDate}</span>
            </div>
          )}
        </div>
      </div>

      {/* Profile Fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Full Name - Read Only */}
        <div className="space-y-2">
          <Label className="text-sm flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            Full Name
            <Lock className="w-3 h-3 text-muted-foreground" />
          </Label>
          <div className="h-11 px-3 flex items-center rounded-lg border border-border/50 bg-secondary/30 text-muted-foreground">
            {profile.name || 'Not provided'}
          </div>
        </div>

        {/* Email - Read Only */}
        <div className="space-y-2">
          <Label className="text-sm flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            Email Address
            <Lock className="w-3 h-3 text-muted-foreground" />
          </Label>
          <div className="h-11 px-3 flex items-center rounded-lg border border-border/50 bg-secondary/30 text-muted-foreground">
            {profile.email || 'Not provided'}
          </div>
        </div>

        {/* Company - Editable */}
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
              placeholder="Enter your company"
            />
          ) : (
            <div className="h-11 px-3 flex items-center rounded-lg border border-border/50 bg-secondary/30">
              {profile.company || 'Not provided'}
            </div>
          )}
        </div>

        {/* Location - Editable */}
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
              placeholder="Enter your location"
            />
          ) : (
            <div className="h-11 px-3 flex items-center rounded-lg border border-border/50 bg-secondary/30">
              {profile.location || 'Not provided'}
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
