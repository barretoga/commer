<script setup lang="ts">
function returnActualYear () {
  const actualDate = new Date()
  return actualDate.getFullYear()
}
</script>

<template>
  <div class="flex mt-20 py-10 flex-col border-t border-neutral">
    <div class="flex gap-5">
      <div class="flex flex-col">
        <h1
          class="font-bold"
        >
          Commer
        </h1>
        <p>Commer is a web commerce whitelabel.</p>
      </div>
      <div class="grid lg:grid-cols-4 gap-5">
        <ul>
          <li
            class="font-bold"
          >
            Produtos
          </li>
          <li>
            <a
              class="hover:text-primary hover:underline"
              href="/"
            >
              Home
            </a>
          </li>
        </ul>
        <ul>
          <li
            class="font-bold"
          >
            Perfil
          </li>
          <li>
            <a
              class="hover:text-primary hover:underline"
              href="/profile"
            >
              Meu perfil
            </a>
          </li>
          <li>
            <a
              class="hover:text-primary hover:underline"
              href="/favorites"
            >
              Favoritos
            </a>
          </li>
        </ul>
        <ul>
          <li
            class="font-bold"
          >
            Sobre
          </li>
          <li>
            <a
              class="hover:text-primary hover:underline"
              href="/about"
            >
              Sobre o projeto
            </a>
          </li>
        </ul>
        <div class="flex flex-col gap-5">
          <p>
            Mantenha-se atualizado sobre o projeto
          </p>
          <Button>
            Subscribe
          </Button>
        </div>
      </div>
    </div>
    <div class="flex items-center mt-5 justify-center">
      <p>
        © Made by 
        <a
          class="hover:text-primary hover:underline"
          href="https://github.com/barretoga"
          target="_blank"
        >
          @Barretoga
        </a>
        ● {{ returnActualYear() }}
      </p>
    </div>
  </div>
</template>
