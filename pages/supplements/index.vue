<script setup lang="ts">
interface Supplement {
  id: string;
  name: string;
  category: string;
  manufacturer?: string;
  benefits: string[];
  dosageAmount: number;
  dosageUnit: string;
  price: number;
}

// Cart state
const cart = ref<{[key: string]: number}>({})
const showCart = ref(false)

// Filters and search
const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('name')

const { data: supplements, pending, error } = await useFetch<Supplement[]>('http://localhost:8080/api/supplement')

// Computed properties
const categories = computed(() => {
  if (!supplements.value) return []
  const cats = new Set(supplements.value.map(s => s.category))
  return ['all', ...Array.from(cats)]
})

const filteredSupplements = computed(() => {
  if (!supplements.value) return []

  let filtered = supplements.value.filter(supplement => {
    const matchesSearch = supplement.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        supplement.manufacturer?.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'all' || supplement.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'name': return a.name.localeCompare(b.name)
      default: return 0
    }
  })

  return filtered
})

const cartTotal = computed(() => {
  if (!supplements.value) return 0
  return Object.entries(cart.value).reduce((total, [id, quantity]) => {
    const supplement = supplements.value?.find(s => s.id === id)
    return total + (supplement?.price || 0) * quantity
  }, 0)
})

const cartItemCount = computed(() => {
  return Object.values(cart.value).reduce((sum, qty) => sum + qty, 0)
})

// Methods
const addToCart = (supplement: Supplement) => {
  cart.value[supplement.id] = (cart.value[supplement.id] || 0) + 1
}

const removeFromCart = (supplementId: string) => {
  if (cart.value[supplementId] > 1) {
    cart.value[supplementId]--
  } else {
    delete cart.value[supplementId]
  }
}

const getCartItems = () => {
  if (!supplements.value) return []
  return Object.entries(cart.value)
      .map(([id, quantity]) => {
        const supplement = supplements.value?.find(s => s.id === id)
        return supplement ? { supplement, quantity } : null
      })
      .filter((item): item is { supplement: Supplement; quantity: number } => item !== null)
}

const getCategoryIcon = (category: string) => {
  const icons: {[key: string]: string} = {
    'Vitamins': 'i-heroicons-star',
    'Minerals': 'i-heroicons-cube',
    'Protein': 'i-heroicons-fire',
    'Herbs': 'i-heroicons-leaf',
    'Amino Acids': 'i-heroicons-beaker',
    'all': 'i-heroicons-squares-2x2'
  }
  return icons[category] || 'i-heroicons-tag'
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Animated Background Pattern -->
    <div class="absolute inset-0 wellness-grid-pattern opacity-5"></div>
    <!-- Header -->
    <div class="relative bg-white bg-opacity-80  backdrop-blur-md shadow-lg border-b border-white border-opacity-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r rounded-full blur opacity-75 animate-pulse"></div>
              <UIcon name="i-heroicons-heart" class="relative w-10 h-10 text-blue-500" />
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent">
                WellnessShop
              </h1>
              <p class="text-sm text-gray-500 dark:text-gray-400">Premium Health & Wellness</p>
            </div>
          </div>

          <UButton
              @click="showCart = true"
              variant="outline"
              size="lg"
              class="relative overflow-hidden group hover:scale-105 transition-all duration-300"
              :badge="cartItemCount || undefined"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <UIcon name="i-heroicons-shopping-cart" class="w-5 h-5 mr-2" />
            Cart {{ cartItemCount > 0 ? `(${cartItemCount})` : '' }}
          </UButton>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <div class="relative inline-block">
          <h2 class="text-5xl md:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-6 wellness-fade-in">
            Premium Health Supplements
          </h2>
          <div class="absolute -inset-4 bg-gradient-to-r  blur-xl rounded-full"></div>
        </div>

        <!-- Stats -->
        <div class="flex justify-center space-x-8 mt-8">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">{{ supplements?.length || 0 }}+</div>
            <div class="text-sm text-gray-500">Products</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600">100%</div>
            <div class="text-sm text-gray-500">Natural</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-indigo-600">5★</div>
            <div class="text-sm text-gray-500">Rated</div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-70 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-12 border border-white border-opacity-20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="relative">
            <UInput
                v-model="searchQuery"
                placeholder="Search supplements..."
                icon="i-heroicons-magnifying-glass"
                size="lg"
                class="wellness-filter-input"
            />
          </div>

          <USelectMenu
              v-model="selectedCategory"
              :options="categories.map(cat => ({
              label: cat === 'all' ? 'All Categories' : cat,
              value: cat,
              icon: getCategoryIcon(cat)
            }))"
              size="lg"
              class="wellness-filter-select"
          />

          <USelectMenu
              v-model="sortBy"
              :options="[
              { label: 'Name A-Z', value: 'name' },
              { label: 'Price: Low to High', value: 'price-low' },
              { label: 'Price: High to Low', value: 'price-high' }
            ]"
              size="lg"
              class="wellness-filter-select"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="flex flex-col justify-center items-center py-20">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
          <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
        </div>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading premium supplements...</p>
      </div>

      <!-- Error State -->
      <UAlert
          v-else-if="error"
          color="primary"
          variant="subtle"
          title="Unable to load supplements"
          description="We're experiencing technical difficulties. Please refresh the page or try again later."
          class="mb-8"
      />

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div
            v-for="supplement in filteredSupplements"
            :key="supplement.id"
            class="group relative bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white border-opacity-20 hover:border-blue-200 hover:border-opacity-50 overflow-hidden"
        >
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500 from-opacity-5 to-purple-500 to-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <!-- Product Image with Gradient -->
          <div class="relative h-56 bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100 dark:from-blue-900 dark:from-opacity-50 dark:via-purple-900 dark:via-opacity-50 dark:to-indigo-900 dark:to-opacity-50 flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white via-opacity-10 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
            <UIcon name="i-heroicons-cube" class="w-20 h-20 text-blue-400 text-opacity-60 group-hover:text-blue-500 group-hover:text-opacity-80 transition-colors duration-300" />

            <!-- Category Badge - Floating -->
            <div class="absolute top-4 left-4">
              <UBadge
                  :label="supplement.category"
                  variant="soft"
                  color="primary"
                  class="backdrop-blur-sm bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 shadow-sm"
                  size="sm"
              />
            </div>

            <!-- Quick Add Button -->
            <button
                @click="addToCart(supplement)"
                class="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
            >
              <UIcon name="i-heroicons-plus" class="w-5 h-5 text-blue-600" />
            </button>
          </div>

          <div class="relative p-6">
            <!-- Product Name -->
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 wellness-line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {{ supplement.name }}
            </h3>

            <!-- Manufacturer -->
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center">
              <UIcon name="i-heroicons-building-office" class="w-4 h-4 mr-1" />
              {{ supplement.manufacturer || 'Premium Brand' }}
            </p>

            <!-- Dosage Info with Icon -->
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-lg p-2">
              <UIcon name="i-heroicons-beaker" class="w-4 h-4 mr-2 text-blue-500" />
              <span class="font-medium">{{ supplement.dosageAmount }} {{ supplement.dosageUnit }}</span>
            </div>

            <!-- Benefits -->
            <div class="mb-6">
              <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <UIcon name="i-heroicons-sparkles" class="w-4 h-4 mr-1 text-yellow-500" />
                Key Benefits
              </h4>
              <div class="flex flex-wrap gap-2">
                <UBadge
                    v-for="benefit in supplement.benefits.slice(0, 2)"
                    :key="benefit"
                    :label="benefit"
                    variant="outline"
                    color="primary"
                    size="xs"
                    class="hover:bg-blue-50 dark:hover:bg-blue-900 dark:hover:bg-opacity-20 transition-colors"
                />
                <UBadge
                    v-if="supplement.benefits.length > 2"
                    :label="`+${supplement.benefits.length - 2} more`"
                    variant="outline"
                    color="primary"
                    size="xs"
                />
              </div>
            </div>

            <!-- Price and Add to Cart -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="flex flex-col">
                <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {{ formatPrice(supplement.price) }}
                </span>
                <span class="text-xs text-gray-500">per bottle</span>
              </div>

              <div class="flex items-center space-x-2">
                <span v-if="cart[supplement.id]" class="text-sm text-blue-600 font-medium bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 px-2 py-1 rounded-full">
                  {{ cart[supplement.id] }}x in cart
                </span>
                <UButton
                    @click="addToCart(supplement)"
                    color="primary"
                    variant="solid"
                    size="sm"
                    class="group/btn hover:scale-105 transition-transform duration-200"
                    :icon="cart[supplement.id] ? 'i-heroicons-plus' : 'i-heroicons-shopping-cart'"
                >
                  {{ cart[supplement.id] ? 'Add More' : 'Add to Cart' }}
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!pending && !error && filteredSupplements.length === 0" class="text-center py-20">
        <div class="relative inline-block mb-6">
          <div class="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:from-opacity-20 dark:to-purple-900 dark:to-opacity-20 rounded-full flex items-center justify-center">
            <UIcon name="i-heroicons-magnifying-glass" class="w-12 h-12 text-gray-400" />
          </div>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">No supplements found</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search criteria or browse all categories</p>
        <UButton @click="searchQuery = ''; selectedCategory = 'all'" variant="outline" size="lg">
          Clear Filters
        </UButton>
      </div>
    </div>

    <!-- Shopping Cart Slideout -->
    <USlideover v-model="showCart" side="right" class="wellness-cart-slideout">
      <div class="p-6 h-full flex flex-col bg-white dark:bg-gray-900">
        <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Shopping Cart</h2>
          <UButton @click="showCart = false" variant="ghost" icon="i-heroicons-x-mark" size="lg" />
        </div>

        <div v-if="cartItemCount === 0" class="flex-1 flex flex-col items-center justify-center text-center">
          <div class="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:from-opacity-20 dark:to-purple-900 dark:to-opacity-20 rounded-full flex items-center justify-center mb-4">
            <UIcon name="i-heroicons-shopping-cart" class="w-12 h-12 text-gray-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-6">Add some supplements to get started</p>
          <UButton @click="showCart = false" variant="outline" size="lg">
            Continue Shopping
          </UButton>
        </div>

        <div v-else class="flex-1 flex flex-col">
          <div class="flex-1 space-y-4 overflow-y-auto">
            <div
                v-for="{ supplement, quantity } in getCartItems()"
                :key="supplement.id"
                class="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 to-opacity-50 dark:from-gray-800 dark:to-blue-900 dark:to-opacity-20 rounded-xl border border-gray-200 border-opacity-50 dark:border-gray-700 dark:border-opacity-50"
            >
              <div class="flex-1 pr-4">
                <h4 class="font-semibold text-gray-900 dark:text-white wellness-line-clamp-1">{{ supplement.name }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatPrice(supplement.price) }} each</p>
                <p class="text-sm font-medium text-blue-600">{{ formatPrice(supplement.price * quantity) }} total</p>
              </div>
              <div class="flex items-center space-x-3">
                <UButton
                    @click="removeFromCart(supplement.id)"
                    variant="outline"
                    size="xs"
                    icon="i-heroicons-minus"
                    class="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                />
                <span class="w-8 text-center font-semibold text-gray-900 dark:text-white">{{ quantity }}</span>
                <UButton
                    @click="addToCart(supplement)"
                    variant="outline"
                    size="xs"
                    icon="i-heroicons-plus"
                    class="hover:bg-green-50 hover:border-green-200 hover:text-green-600"
                />
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
            <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:from-opacity-20 dark:to-purple-900 dark:to-opacity-20 rounded-xl p-4 mb-6">
              <div class="flex justify-between items-center mb-2">
                <span class="text-lg font-semibold text-gray-900 dark:text-white">Subtotal:</span>
                <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {{ formatPrice(cartTotal) }}
                </span>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ cartItemCount }} item{{ cartItemCount > 1 ? 's' : '' }} in cart</p>
            </div>

            <UButton color="primary" size="lg" block class="mb-3 hover:scale-105 transition-transform">
              <UIcon name="i-heroicons-credit-card" class="w-5 h-5 mr-2" />
              Proceed to Checkout
            </UButton>

            <UButton @click="showCart = false" variant="outline" size="lg" block>
              Continue Shopping
            </UButton>
          </div>
        </div>
      </div>
    </USlideover>
  </div>
</template>