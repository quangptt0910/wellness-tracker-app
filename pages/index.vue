<template>
  <div class="min-h-screen">
    <div class="container mx-auto px-4 py-4">
      <h1 class="w-full text-center text-4xl">Welcome To PureDose!</h1>
      <p class="text-center mt-4 text-primary-700 text-2xl">
        Track your health and wellness journey with our comprehensive supplement tracking system.
      </p>

      <section class="split-card">
        <!-- LEFT SIDE: Text / Title / Button -->
        <div class="split-card__text">
          <h1 class="split-card__title">Bio Active <br> Vitamins</h1>
          <p class="split-card__subtitle">
            Vitamins are essential for many functions in our bodies. Essential nutrients provide energy
            by converting food into fuel and promoting healthy stress…
          </p>
          <nuxt-link to="/details" class="split-card__button">
            View Details
          </nuxt-link>
        </div>

        <!-- RIGHT SIDE: Image -->
        <div class="split-card__image">
          <img
              src="~/assets/images/products.jpg"
              alt="Assorted BioActive Nutrients"
              class="split-card__img"
          />
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
</script>


<style scoped>
/* --------------------------------------------------------- */
/* 1. Container styles for the split card:                   */
/* --------------------------------------------------------- */
.split-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;      /* center horizontally */
  padding: 4rem 1rem;  /* add some top/bottom and horizontal padding */
  border-radius: 0.5rem;
  box-shadow: 0 8px 6px -4px rgba(0, 0, 0, 0.08);
  gap: 1rem;           /* space between the two sides */
}

/* --------------------------------------------------------- */
/* 2. Left side (text)                                         */
/* --------------------------------------------------------- */
.split-card__text {
  flex: 1;            /* take up equal space */
}

/* Title styling */
.split-card__title {
  font-size: 3rem;
  line-height: 1.2;
  margin: 0 0 1rem;
  color: #1a3620;
}

/* Subtitle/paragraph */
.split-card__subtitle {
  font-size: 1.125rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 2rem;
}

/* “View Details” button styled as a link */
.split-card__button {
  display: inline-block;
  background-color: #065f46;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease;
}
.split-card__button:hover {
  background-color: #16301b;
}

/* --------------------------------------------------------- */
/* 3. Right side (image)                                      */
/* --------------------------------------------------------- */
.split-card__image {
  flex: 1;            /* take up equal space */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Ensure the image doesn’t overflow and stays responsive */
.split-card__img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

/* --------------------------------------------------------- */
/* 4. Responsive breakpoint: stack vertically on small screens */
/* --------------------------------------------------------- */
@media (max-width: 768px) {
  .split-card {
    flex-direction: column-reverse; /* image below text */
    text-align: center;              /* center text on mobile */
  }
  .split-card__text,
  .split-card__image {
    width: 100%;
  }
  .split-card__image {
    margin-bottom: 2rem;
  }
  .split-card__title {
    font-size: 2.25rem;
  }
  .split-card__subtitle {
    font-size: 1rem;
  }
}
</style>