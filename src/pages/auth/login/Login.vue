<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <form @submit.prevent="submitForm">
      <!-- <va-input
        v-model="email"
        class="mb-3"
        type="email"
        :label="t('auth.email')"
        :error="!!emailErrors.length"
        :error-messages="emailErrors"
      />
  
      <va-input
        v-model="password"
        class="mb-3"
        type="password"
        :label="t('auth.password')"
        :error="!!passwordErrors.length"
        :error-messages="passwordErrors"
      />
  
      <div class="auth-layout__options d-flex align-center justify-space-between">
        <va-checkbox v-model="keepLoggedIn" class="mb-0" :label="t('auth.keep_logged_in')" />
        <router-link class="ml-1 va-link" :to="{ name: 'recover-password' }">{{
          t('auth.recover_password')
        }}</router-link>
      </div>
  
      <div class="d-flex justify-center mt-3">
        <va-button class="my-0" @click="onsubmit">{{ t('auth.login') }}</va-button>
      </div> -->

      <va-input v-model="phoneNumber" class="mb-3" type="text" :label="t('auth.phoneNumber')" />

      <va-input v-model="password" class="mb-3" type="password" :label="t('auth.password')" />

      <div class="d-flex justify-center mt-3">
        <va-button class="my-0" @click="submitForm">{{ t('auth.login') }}</va-button>
      </div>
    </form>
  </div>
</template>

<!-- <script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

  const email = ref('')
  const password = ref('')
  const keepLoggedIn = ref(false)
  const emailErrors = ref<string[]>([])
  const passwordErrors = ref<string[]>([])
  const router = useRouter()

  const formReady = computed(() => !emailErrors.value.length && !passwordErrors.value.length)

  function onsubmit() {
    if (!formReady.value) return

    emailErrors.value = email.value ? [] : ['Email is required']
    passwordErrors.value = password.value ? [] : ['Password is required']

    router.push({ name: 'dashboard' })
  }
</script> -->

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { useI18n } from 'vue-i18n'

  const store = useStore()
  const { t } = useI18n()

  const phoneNumber = ref('+855962424486')
  const password = ref('1234')
  const isLoading = ref(false)
  const error = ref(null)
  const router = useRouter()

  const actionPayload = {
    phone: phoneNumber.value,
    password: password.value,
  }

  const submitForm = async function () {
    try {
      isLoading.value = true

      await store.dispatch('login', actionPayload)

      router.push({ name: 'dashboard' })
    } catch (err) {
      error.value = err?.message || 'Failed to authenticate, try later.'
    }

    isLoading.value = false
  }

  const handleError = function () {
    error.value = null
  }
</script>
