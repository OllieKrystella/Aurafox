/**
 * Copyright (c) 2025 Ollie Krystella
 * This software is private, and not to be distributed unless explicitly permitted by the author.
 * 
 * @module Aura
 * @author Ollie Krystella
 * @version 1.1
 * @date 3/5/2025
 * 
 * @example
 * // You can use aurafox with this simple snippet
 * Aura; // This is a constant object, containing all functionality
 * 
 * // For example, you can generate a random number between 0 and 10 like this
 * const result = Aura.Random.Range(0, 10);
 */
const Aura = (() =>
{
    'use strict';
    
    // Errors
    class AuraError extends Error 
    {}
    
    class AuraDOMError extends Error 
    {}
    
    class AuraRandomError extends Error 
    {}
    
    class AuraMathError extends Error 
    {}
    
    class AuraCryptoError extends Error 
    {}
    
    // Events
    class AuraSuccess extends Event
    {}
    
    class AuraFailed extends Event
    {}
    
    class AuraStatus extends Event
    {}
    
    /**
     * A utility class for DOM manipulation.
     * 
     * @class DOM
     * @example
     * // Access the DOM class
     * Aura.DOM;
     */
    class DOM
    {
        /**
         * Gets an element by it's ID.
         * 
         * @param {string} value - The ID of the element
         * @returns {HTMLElement} The resulting element
         */
        static ID(value)
        {
            return document.getElementById(value);
        }
        
        /**
         * Executes a function for each specified element.
         * 
         * @param {string} query - The element query
         * @param {function} callback - The callback function
         * @throws {AuraDOMError}
         */
        static Call(query, callback)
        {
            // Validate parameters
            if (typeof classname !== "string")
            {
                document.dispatchEvent(new AuraFailedEvent("dom"));
                throw new AuraDOMError("Typeof classname must be a string!");
            }
            if (typeof callback !== "function")
            {
                document.dispatchEvent(new AuraFailedEvent("dom"));
                throw new AuraDOMError("Typeof callback must be a function!");
            }
            
            // Process the request
            const elements = document.querySelectorAll(query);
            Array.from(elements).forEach(element =>
            {
               callback(element); 
            });
        }
    }
    
    /**
     * A utility class for generating random values.
     * 
     * @class Random
     * @example
     * // Access the Random class
     * Aura.Random;
     */
    class Random
    {
        /**
         * Generates a random number between the specified min and max values.
         * 
         * @param {number} min - The minimum value (inclusive).
         * @param {number} max - The maximum value (exclusive).
         * @returns {number} A random number between min and max.
         */
        static Range(min, max)
        {
            return Math.random() * (max - min) + min;
        }
        
        /**
         * Generates a random integer between the specified min and max values.
         * 
         * @param {number} min - The minimum value (inclusive).
         * @param {number} max - The maximum value (exclusive).
         * @returns {number} A random integer between min and max.
         */
        static RangeInt(min, max)
        {
            return Math.floor(Math.random() * (max - min) + min);
        }
        
        /**
         * Gets a random element from an array, a random value from an object,
         * or a random character from a string.
         * 
         * @param {Array|Object|string} haystack - The array, object, or string to choose from.
         * @returns {any|undefined} A random element, value, or character, or undefined if input is not valid.
         */
        static In(haystack)
        {
            switch (typeof haystack)
            {
                case "object":
                    if (Array.isArray(haystack))
                    {
                        return haystack[Math.floor(this.Range(0, haystack.length))];
                    }
                    const keys = Object.keys(haystack);
                    if (keys.length === 0) return undefined;
                    return haystack[keys[Math.floor(this.Range(0, keys.length))]];
                case "string":
                    return haystack.charAt(Math.floor(this.Range(0, haystack.length)));
                default:
                    return undefined;
            }
        }
        
        /**
         * Selects an item from an array based on specified weights.
         * 
         * @param {Array} items - An array of items to choose from.
         * @param {Array} weights - An array of weights corresponding to the items.
         * @returns {any} A randomly selected item based on the weights.
         */
        static WeightedSelect(items, weights)
        {
            const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
            const randomNum = Math.random() * totalWeight;
            let cumulativeWeight = 0;
            for (let i = 0; i < items.length; i++)
            {
                cumulativeWeight += weights[i];
                if (randomNum < cumulativeWeight)
                {
                    return items[i];
                }
            }
        }
    }
    
    /**
     * A utility class for mathematical operations.
     * 
     * @class Arithma
     * @example
     * // Access the Arithma class
     * Aura.Arithma;
     */
    class Arithma
    {
        /**
         * Calculates the area of a rectangle.
         * 
         * @param {number} x - The length of the rectangle.
         * @param {number} y - The width of the rectangle.
         * @returns {number} The area of the rectangle.
         */
        static Square(x, y)
        {
            return x * y;
        }
        
        /**
         * Calculates the volume of a rectangular prism.
         * 
         * @param {number} x - The length of the prism.
         * @param {number} y - The width of the prism.
         * @param {number} z - The height of the prism.
         * @returns {number} The volume of the prism.
         */
        static Cube(x, y, z)
        {
            return x * y * z;
        }
        
        /**
         * Clamps a value between a minimum and maximum value.
         * 
         * @param {number} value - The value to clamp.
         * @param {number} min - The minimum value.
         * @param {number} max - The maximum value.
         * @returns {number} The clamped value.
         */
        static Clamp(value, min, max)
        {
            return Math.max(min, Math.min(value, max));
        }

        /**
         * Linearly interpolates between two values.
         * 
         * @param {number} a - The start value.
         * @param {number} b - The end value.
         * @param {number} t - The interpolation factor (between 0 and 1).
         * @returns {number} The interpolated value.
         */
        static Lerp(a, b, t)
        {
            return a + (b - a) * t;
        }
        
        /**
         * Calculates the mean of an array of numbers.
         * 
         * @param {Array<number>} array - The array of numbers.
         * @returns {number} The mean of the array.
         */
        static Mean(array)
        {
            const total = array.reduce((sum, value) => sum + value, 0);
            return total / array.length;
        }

        /**
         * Calculates the median of an array of numbers.
         * 
         * @param {Array<number>} array - The array of numbers.
         * @returns {number} The median of the array.
         */
        static Median(array)
        {
            const sorted = [...array].sort((a, b) => a - b);
            const mid = Math.floor(sorted.length / 2);
            return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
        }

        /**
         * Calculates the variance of an array of numbers.
         * 
         * @param {Array<number>} array - The array of numbers.
         * @returns {number} The variance of the array.
         */
        static Variance(array)
        {
            const mean = this.Mean(array);
            return this.Mean(array.map(x => Math.pow(x - mean, 2)));
        }

        /**
         * Calculates the standard deviation of an array of numbers.
         * 
         * @param {Array<number>} array - The array of numbers.
         * @returns {number} The standard deviation of the array.
         */
        static StandardDeviation(array)
        {
            return Math.sqrt(this.Variance(array));
        }

        /**
         * Returns the maximum value from an array of numbers.
         * 
         * @param {Array<number>} array - The array of numbers.
         * @returns {number} The maximum value.
         */
        static Max(array)
        {
            return Math.max(...array);
        }

        /**
         * Returns the minimum value from an array of numbers.
         * 
         * @param {Array<number>} array - The array of numbers.
         * @returns {number} The minimum value.
         */
        static Min(array)
        {
            return Math.min(...array);
        }

        /**
         * Returns the sum of an array of numbers.
         * 
         * @param {Array<number>} array - The array of numbers.
         * @returns {number} The sum of the array.
         */
        static Sum(array)
        {
            return array.reduce((sum, value) => sum + value, 0);
        }
    }
    
    /**
     * A utility class for 2D Vectors.
     * 
     * @class Vector2
     */
    class Vector2
    {
        /**
         * Creates a new Vector2 instance.
         * 
         * @param {number} x - The x component of the vector.
         * @param {number} y - The y component of the vector.
         */
        constructor(x, y)
        {
            this.x = x;
            this.y = y;
        }

        /**
         * Adds another vector to this vector.
         * 
         * @param {Vector2} vector - The vector to add.
         * @returns {Vector2} The resulting vector.
         */
        Add(vector)
        {
            return new Vector2(this.x + vector.x, this.y + vector.y);
        }

        /**
         * Subtracts another vector from this vector.
         * 
         * @param {Vector2} vector - The vector to subtract.
         * @returns {Vector2} The resulting vector.
         */
        Subtract(vector)
        {
            return new Vector2(this.x - vector.x, this.y - vector.y);
        }

        /**
         * Multiplies this vector by a scalar.
         * 
         * @param {number} scalar - The scalar to multiply by.
         * @returns {Vector2} The resulting vector.
         */
        Multiply(scalar)
        {
            return new Vector2(this.x * scalar, this.y * scalar);
        }

        /**
         * Divides this vector by a scalar.
         * 
         * @param {number} scalar - The scalar to divide by.
         * @returns {Vector2} The resulting vector.
         */
        Divide(scalar)
        {
            return new Vector2(this.x / scalar, this.y / scalar);
        }

        /**
         * Returns the length of the vector.
         * 
         * @returns {number} The length of the vector.
         */
        Length()
        {
            return Math.sqrt(this.x ** 2 + this.y ** 2);
        }

        /**
         * Normalizes the vector.
         * 
         * @returns {Vector2} The normalized vector.
         */
        Normalize()
        {
            const len = this.length();
            return len > 0 ? this.divide(len) : new Vector2(0, 0);
        }

        /**
         * Computes the dot product with another vector.
         * 
         * @param {Vector2} vector - The vector to compute the dot product with.
         * @returns {number} The dot product.
         */
        Dot(vector)
        {
            return this.x * vector.x + this.y * vector.y;
        }

        /**
         * Creates a vector from an angle in radians.
         * 
         * @param {number} angle - The angle in radians.
         * @returns {Vector2} The resulting vector.
         */
        static FromAngle(angle)
        {
            return new Vector2(Math.cos(angle), Math.sin(angle));
        }
    }

    /**
     * A utility class for 3D Vectors.
     * 
     * @class Vector3
     */
    class Vector3
    {
        /**
         * Creates a new Vector3 instance.
         * 
         * @param {number} x - The x component of the vector.
         * @param {number} y - The y component of the vector.
         * @param {number} z - The z component of the vector.
         */
        constructor(x, y, z)
        {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        /**
         * Adds another vector to this vector.
         * 
         * @param {Vector3} vector - The vector to add.
         * @returns {Vector3} The resulting vector.
         */
        Add(vector)
        {
            return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
        }

        /**
         * Subtracts another vector from this vector.
         * 
         * @param {Vector3} vector - The vector to subtract.
         * @returns {Vector3} The resulting vector.
         */
        Subtract(vector)
        {
            return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
        }

        /**
         * Multiplies this vector by a scalar.
         * 
         * @param {number} scalar - The scalar to multiply by.
         * @returns {Vector3} The resulting vector.
         */
        Multiply(scalar)
        {
            return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
        }

        /**
         * Divides this vector by a scalar.
         * 
         * @param {number} scalar - The scalar to divide by.
         * @returns {Vector3} The resulting vector.
         */
        Divide(scalar)
        {
            return new Vector3(this.x / scalar, this.y / scalar, this.z / scalar);
        }

        /**
         * Returns the length of the vector.
         * 
         * @returns {number} The length of the vector.
         */
        Length()
        {
            return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
        }

        /**
         * Normalizes the vector.
         * 
         * @returns {Vector3} The normalized vector.
         */
        Normalize()
        {
            const len = this.length();
            return len > 0 ? this.divide(len) : new Vector3(0, 0, 0);
        }

        /**
         * Computes the dot product with another vector.
         * 
         * @param {Vector3} vector - The vector to compute the dot product with.
         * @returns {number} The dot product.
         */
        Dot(vector)
        {
            return this.x * vector.x + this.y * vector.y + this.z * vector.z;
        }

        /**
         * Computes the cross product with another vector.
         * 
         * @param {Vector3} vector - The vector to compute the cross product with.
         * @returns {Vector3} The cross product.
         */
        Cross(vector)
        {
            return new Vector3(
                this.y * vector.z - this.z * vector.y,
                this.z * vector.x - this.x * vector.z,
                this.x * vector.y - this.y * vector.x
            );
        }
    }
    
    
    /**
     * Returns a public API.
     * 
     * @returns {Object}
     */
    return {
        DOM: DOM,
        Random: Random,
        Arithma: Arithma,
        Math: Arithma,
        Vector2: Vector2,
        Vector3: Vector3
    };
})();
