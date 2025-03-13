import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SHA {
    public static void main(String[] args) {
        String input = "Hello, World!";
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(input.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');

                }
                hexString.append(hex);
            }
            System.out.println("SHA-256 hash: " + hexString.toString());
        } catch (NoSuchAlgorithmException e) {
            System.err.println("SHA-256 algorithm not found: " + e.getMessage());
        }
    }
}
