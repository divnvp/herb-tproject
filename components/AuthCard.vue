<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";
import { useFetchByBaseURL } from "~/composables/fetch-by-base-url";

const schema = v.object({
  login: v.pipe(v.string(), v.email("Неверный e-mail")),
  password: v.pipe(v.string(), v.minLength(8, "Минимум 8 символов")),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive({
  login: "",
  password: "",
});

// Password: Qw12345678!
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { data, status, error, refresh, clear } = await useFetchByBaseURL(
    "token/",
    {
      method: "POST",
      body: {
        email: event.data.login,
        password: event.data.password,
      },
    },
  );
  console.log(data, status, error, refresh, clear);
}
</script>

<template>
  <LayoutSlot>
    <UCard>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="flex flex-col justify-center items-center gap-3">
          <UFormField label="E-mail" name="login">
            <UInput v-model="state.login" />
          </UFormField>

          <UFormField label="Пароль" name="password">
            <UInput v-model="state.password" type="password" />
          </UFormField>

          <UButton type="submit" class="cursor-pointer">
            Войти в аккаунт
          </UButton>
        </div>
      </UForm>
    </UCard>
  </LayoutSlot>
</template>
