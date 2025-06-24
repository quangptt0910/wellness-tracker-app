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

// Filters and search
const searchQuery = ref('')
const selectedCategories = ref<string[]>([])
const sortBy = ref('name')

const { data: supplements, pending, error } = await useFetch<Supplement[]>('http://localhost:8080/api/supplement')

// Updated categories to match the enum
const categories = computed(() => {
  const categoryMap = {
    'VITAMINS': 'Vitamins',
    'MINERALS': 'Minerals',
    'HERBAL': 'Herbal',
    'PROTEIN': 'Protein',
    'OMEGA_FATTY_ACID': 'Omega Fatty Acids',
    'PROBIOTIC': 'Probiotics',
    'AMINO_ACID': 'Amino Acids',
    'SUPPLEMENTS': 'Supplements',
    'GUT_HEALTH': 'Gut Health',
    'ADAPTOGENS': 'Adaptogens',
    'ANTI_INFLAMMATORY': 'Anti-Inflammatory',
    'SLEEP_AID': 'Sleep Aid',
    'ANTIOXIDANTS': 'Antioxidants'
  }

  if (!supplements.value) return []

  const cats = new Set(supplements.value.map(s => s.category))
  const categoryList: Array<{key: string, label: string}> = []

  Array.from(cats).forEach(cat => {
    categoryList.push({
      key: cat,
      label: categoryMap[cat] || cat
    })
  })

  return categoryList
})

const filteredSupplements = computed(() => {
  if (!supplements.value) return []

  let filtered = supplements.value.filter(supplement => {
    const matchesSearch = supplement.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        supplement.manufacturer?.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategories.value.length === 0 || selectedCategories.value.includes(supplement.category)
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

const toggleCategory = (categoryKey: string) => {
  const index = selectedCategories.value.indexOf(categoryKey)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(categoryKey)
  }
}

const removeCategory = (categoryKey: string) => {
  const index = selectedCategories.value.indexOf(categoryKey)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  }
}

const clearAllFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
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
    'VITAMINS': 'i-heroicons-star',
    'MINERALS': 'i-heroicons-cube',
    'PROTEIN': 'i-heroicons-fire',
    'HERBAL': 'i-heroicons-leaf',
    'AMINO_ACID': 'i-heroicons-beaker',
    'OMEGA_FATTY_ACID': 'i-heroicons-heart',
    'PROBIOTIC': 'i-heroicons-shield-check',
    'GUT_HEALTH': 'i-heroicons-heart',
    'ADAPTOGENS': 'i-heroicons-sparkles',
    'ANTI_INFLAMMATORY': 'i-heroicons-shield-exclamation',
    'SLEEP_AID': 'i-heroicons-moon',
    'ANTIOXIDANTS': 'i-heroicons-sun',
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

    <div class="flex min-h-screen">
      <!-- Left Sidebar - Filters -->
      <div class="w-80 bg-white bg-opacity-80 backdrop-blur-md border-r border-gray-200 p-6 fixed left-0 top-0 h-full overflow-y-auto z-10">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Filters</h2>
          <div class="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

        <!-- Search -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <div class="relative">
            <UIcon name="i-heroicons-magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search supplements..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Sort -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
              v-model="sortBy"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Name (A-Z)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
          </select>
        </div>

        <!-- Categories -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">Categories</label>
          <div class="grid grid-cols-2 gap-2">
            <div
                v-for="category in categories"
                :key="category.key"
                @click="toggleCategory(category.key)"
                class="flex items-center p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50 border border-transparent text-sm"
                :class="{
                'bg-blue-100 border-blue-200 text-blue-800': selectedCategories.includes(category.key),
                'hover:bg-gray-50 text-gray-700': !selectedCategories.includes(category.key)
              }"
            >
              <UIcon :name="getCategoryIcon(category.key)" class="w-4 h-4 mr-2 flex-shrink-0" />
              <span class="font-medium truncate">{{ category.label }}</span>
            </div>
          </div>
        </div>

        <!-- Clear Filters -->
        <div v-if="searchQuery || selectedCategories.length > 0">
          <UButton @click="clearAllFilters" variant="outline" size="sm" block>
            <UIcon name="i-heroicons-x-mark" class="w-4 h-4 mr-2" />
            Clear All Filters
          </UButton>
        </div>
      </div>

      <!-- Main Content - Supplements -->
      <div class="flex-1 ml-80 mr-96 px-8 py-12">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Premium Supplements</h1>
          <p class="text-lg text-gray-600 mb-6">Discover the finest selection of health and wellness supplements</p>

          <!-- Applied Categories -->
          <div v-if="selectedCategories.length > 0" class="mb-6">
            <div class="flex flex-wrap justify-center gap-2">
              <UBadge
                  v-for="categoryKey in selectedCategories"
                  :key="categoryKey"
                  variant="soft"
                  color="primary"
                  class="cursor-pointer hover:bg-blue-200 transition-colors"
                  @click="removeCategory(categoryKey)"
              >
                <UIcon :name="getCategoryIcon(categoryKey)" class="w-3 h-3 mr-1" />
                {{ categories.find(c => c.key === categoryKey)?.label }}
                <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1" />
              </UBadge>
            </div>
          </div>

          <div class="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="flex flex-col justify-center items-center py-20">
          <div class="relative">
            <div class="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div class="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <p class="mt-4 text-lg text-gray-600">Loading premium supplements...</p>
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
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div
              v-for="supplement in filteredSupplements"
              :key="supplement.id"
              class="group relative bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white border-opacity-20 hover:border-blue-200 hover:border-opacity-50 overflow-hidden"
          >
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-br to-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <!-- Product Image with Gradient -->
            <div class="relative h-42 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white via-opacity-10 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
              <UIcon name="i-heroicons-cube" class="w-20 h-20 text-primary-500 text-opacity-60 group-hover:text-primary-500 group-hover:text-opacity-80 transition-colors duration-300" />

              <!-- Category Badge - Floating -->
              <div class="absolute top-4 left-4">
                <UBadge
                    :label="supplement.category"
                    variant="soft"
                    color="primary"
                    class="backdrop-blur-sm bg-white bg-opacity-80 shadow-sm"
                    size="sm"
                />
              </div>

              <!-- Quick Add Button -->
              <button
                  @click="addToCart(supplement)"
                  class="absolute top-4 right-4 w-10 h-10 bg-primary-100 bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
              >
                <UIcon name="i-heroicons-plus" class="w-5 h-5 text-blue-600" />
              </button>
            </div>

            <div class="relative p-6">
              <!-- Product Name -->
              <h3 class="text-xl font-bold text-gray-900 mb-2 wellness-line-clamp-2 group-hover:text-blue-600 transition-colors">
                {{ supplement.name }}
              </h3>

              <!-- Dosage Info with Icon -->
              <div class="flex items-center text-sm text-gray-600 mb-4 bg-gray-50 rounded-lg p-2">
                <UIcon name="i-heroicons-beaker" class="w-3 h-3 mr-2 text-blue-500" />
                <span class="font-medium">{{ supplement.dosageAmount }} {{ supplement.dosageUnit }}</span>
              </div>

              <!-- Benefits -->
              <div class="mb-4">
                <div class="flex flex-wrap gap-2">
                  <UBadge
                      v-for="benefit in supplement.benefits.slice(0, 2)"
                      :key="benefit"
                      :label="benefit"
                      variant="outline"
                      color="primary"
                      size="sm"
                      class="hover:bg-blue-50 transition-colors"
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
              <div class="flex items-center justify-between pt-3 border-t border-gray-200">
                <div class="flex flex-col">
                  <span class="text-xl font-bold text-blue-600">
                    {{ formatPrice(supplement.price) }}
                  </span>
                  <span class="text-xs text-gray-500">per bottle</span>
                </div>

                <div class="flex items-center space-x-2">
                  <span v-if="cart[supplement.id]" class="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">
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
            <div class="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <UIcon name="i-heroicons-magnifying-glass" class="w-12 h-12 text-gray-400" />
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">No supplements found</h3>
          <p class="text-gray-500 mb-6">Try adjusting your search criteria or browse all categories</p>
          <UButton @click="clearAllFilters" variant="outline" size="lg">
            Clear Filters
          </UButton>
        </div>
      </div>

      <!-- Right Sidebar - Shopping Cart -->
      <div class="w-80 bg-white bg-opacity-80 backdrop-blur-md border-l border-gray-200 fixed right-0 top-0 h-full overflow-y-auto z-10">
        <div class="p-6 h-full flex flex-col">
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Shopping Cart</h2>
            <div class="flex items-center space-x-2">
              <UBadge :label="cartItemCount.toString()" color="primary" size="sm" />
              <UIcon name="i-heroicons-shopping-cart" class="w-6 h-6 text-blue-600" />
            </div>
          </div>

          <div v-if="cartItemCount === 0" class="flex-1 flex flex-col items-center justify-center text-center">
            <div class="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
              <UIcon name="i-heroicons-shopping-cart" class="w-12 h-12 text-gray-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p class="text-gray-500 mb-6">Add some supplements to get started</p>
          </div>

          <div v-else class="flex-1 flex flex-col">
            <div class="flex-1 space-y-4 overflow-y-auto">
              <div
                  v-for="{ supplement, quantity } in getCartItems()"
                  :key="supplement.id"
                  class="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 to-opacity-50 rounded-xl border border-gray-200 border-opacity-50"
              >
                <div class="flex-1 pr-4">
                  <h4 class="font-semibold text-gray-900 wellness-line-clamp-1">{{ supplement.name }}</h4>
                  <p class="text-sm text-gray-500">{{ formatPrice(supplement.price) }} each</p>
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
                  <span class="w-8 text-center font-semibold text-gray-900">{{ quantity }}</span>
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

            <div class="border-t border-gray-200 pt-6 mt-6">
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-lg font-semibold text-gray-900">Subtotal:</span>
                  <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {{ formatPrice(cartTotal) }}
                  </span>
                </div>
                <p class="text-sm text-gray-500">{{ cartItemCount }} item{{ cartItemCount > 1 ? 's' : '' }} in cart</p>
              </div>

              <UButton color="primary" size="lg" block class="mb-3 hover:scale-105 transition-transform">
                <UIcon name="i-heroicons-credit-card" class="w-5 h-5 mr-2" />
                Proceed to Checkout
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.wellness-line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.wellness-line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.wellness-grid-pattern {
  background-image: radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.1) 1px, transparent 0);
  background-size: 20px 20px;
}
</style>