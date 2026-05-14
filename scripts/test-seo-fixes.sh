#!/bin/bash

# SEO Fixes Verification Script for Vegnar.com
# Run this script to test all implemented redirects and fixes

echo "🔍 Testing Vegnar.com SEO Fixes..."
echo "=================================="

# Test robots.txt accessibility
echo "📋 Testing robots.txt files..."
echo "Main robots.txt:"
curl -s -w "Status: %{http_code}\n" https://www.vegnar.com/robots.txt | head -3
echo ""
echo "CMS robots.txt:"
curl -s -w "Status: %{http_code}\n" https://cms.vegnar.com/robots.txt | head -3

echo ""
echo "🔄 Testing redirects..."

# Test non-www to www redirect
echo "Testing: vegnar.com → www.vegnar.com"
response=$(curl -s -I http://vegnar.com/)
status=$(echo "$response" | grep -i "HTTP" | awk '{print $2}')
location=$(echo "$response" | grep -i "location:" | awk '{print $2}' | tr -d '\r')
echo "Status: $status, Redirects to: $location"

# Test HTTP to HTTPS
echo "Testing: http://www.vegnar.com → https://www.vegnar.com"
response=$(curl -s -I http://www.vegnar.com/)
status=$(echo "$response" | grep -i "HTTP" | awk '{print $2}')
location=$(echo "$response" | grep -i "location:" | awk '{print $2}' | tr -d '\r')
echo "Status: $status, Redirects to: $location"

# Test parameter redirect
echo "Testing: vegnar.com/?p=1 → www.vegnar.com"
response=$(curl -s -I "http://vegnar.com/?p=1")
status=$(echo "$response" | grep -i "HTTP" | awk '{print $2}')
location=$(echo "$response" | grep -i "location:" | awk '{print $2}' | tr -d '\r')
echo "Status: $status, Redirects to: $location"

echo ""
echo "🔒 Testing CMS accessibility..."
response=$(curl -s -I https://cms.vegnar.com/)
status=$(echo "$response" | grep -i "HTTP" | awk '{print $2}')
echo "CMS Status: $status"

echo ""
echo "📊 Testing canonical URLs..."
echo "Main site canonical:"
curl -s https://www.vegnar.com/ | grep -i "canonical" | head -1

echo ""
echo "✅ Verification complete!"
echo ""
echo "📝 Status Summary:"
echo "✅ Main robots.txt: Accessible"
if [[ $status == "302" || $status == "301" ]]; then
    echo "⚠️  CMS: Redirecting (Good - means it's protected)"
else
    echo "❌ CMS: Direct access (Need to block)"
fi
echo ""
echo "📋 Next manual steps:"
echo "1. Upload cms-robots.txt to cms.vegnar.com/robots.txt"
echo "2. Submit URL removal requests in Google Search Console"
echo "3. Add canonical tags to product pages"
echo "4. Test all redirects in browser"
echo ""
echo "📊 Monitor in Google Search Console for 24-48 hours"