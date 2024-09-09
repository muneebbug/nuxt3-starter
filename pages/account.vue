<template>
  <div class="md:w-1/2 md:mx-auto flex flex-col gap-4">
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <AccountProfile />
      </CardContent>
    </Card>
    <Card>
      <CardHeader v-if="user?.provider === 'default'">
        <CardTitle>Password</CardTitle>
      </CardHeader>
      <CardContent>
        <AccountPassword />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <AccountPreferences />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <AccountSessions />
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const { user } = useAuthSession()
</script>
